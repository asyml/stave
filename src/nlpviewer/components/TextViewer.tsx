import React from 'react';
import Tab from './Tab';
import style from '../styles/TextViewer.module.css';
import { 
  IAnnotation, 
  IPlugin, 
  IProjectConfigs, } from '../lib/interfaces';
import {
  applyColorToLegend,
  isEntryAnnotation,
  isEntryLink,
  isAvailableLegend,
} from '../lib/utils';
import AnnotationDetail from './AnnotationDetail';
import LinkDetail from './LinkDetail';
import TextDetail from './TextDetail';
import TextArea from './TextArea';
import ScopeSelector from './ScopeSelector';
import {
  useTextViewerState,
  useTextViewerDispatch,
} from '../contexts/text-viewer.context';
import LinkCreateBox from './LinkCreateBox';
import AnnotationCreateBox from './AnnotationCreateBox';
import groupPlugin from '../../plugins/group/Group';
import {nextDocument, prevDocument} from '../../app/lib/api';
import {useState} from 'react';

export type OnEventType = (event: any) => void;

export interface TextViewerProp {
  plugins: IPlugin[];
  onEvent?: OnEventType;
  projectConfig: IProjectConfigs;
}


function TextViewer({ plugins, onEvent, projectConfig }: TextViewerProp) {

  const appState = useTextViewerState();
  const dispatch = useTextViewerDispatch();

  const [next_id, setNext] = useState<string>('');
  const [prev_id, setPrev] = useState<string>('');

  const {
    textPack,
    ontology,

    selectedAnnotationId,
    selectedLinkId,

    linkEditFromEntryId,
    linkEditToEntryId,
    linkEditIsCreating,

    annoEditIsCreating,
    annoEditCursorBegin,
    annoEditCursorEnd,

    selectedScopeId,
    selectedScopeIndex,
  } = appState;

  if (!textPack || !ontology || !projectConfig) return null;

  let doc_id = window.location.pathname.split("/").pop() !;
  nextDocument(doc_id).then(data => setNext(data.id));
  prevDocument(doc_id).then(data => setPrev(data.id));

  const { annotations, links, attributes } = textPack;

  const annotationLegendsWithColor = applyColorToLegend(
    ontology.definitions.filter(entry =>
      isEntryAnnotation(ontology, entry.entryName) && isAvailableLegend(projectConfig['legendConfigs'], entry.entryName)
    )
  );
  const linksLegendsWithColor = applyColorToLegend(
    ontology.definitions.filter(entry =>
      isEntryLink(ontology, entry.entryName) && isAvailableLegend(projectConfig['legendConfigs'], entry.entryName)
    )
  );

  const selectedAnnotation =
    annotations.find(ann => ann.id === selectedAnnotationId) || null;
  const selectedAnnotationParents: IAnnotation[] = [];
  const selectedAnnotationChildren: IAnnotation[] = [];

  links.forEach(link => {
    if (link.fromEntryId === selectedAnnotationId) {
      let anno = annotations.find(ann => ann.id === link.toEntryId);
      if (anno) selectedAnnotationChildren.push(anno);
    } else if (link.toEntryId === selectedAnnotationId) {
      let anno = annotations.find(ann => ann.id === link.fromEntryId);
      if (anno) selectedAnnotationParents.push(anno);
    }
  });

  const selectedLink = links.find(link => link.id === selectedLinkId) || null;
  const enabledPlugins = plugins.filter(p => p.enabled(appState));

  const pluginsByName = new Map<string, IPlugin>(
    enabledPlugins.map(
      p => [p.name, p]
    )
  );

  function renderPlugin(p:IPlugin){
    const Comp = p.component;
    return <Comp key={'plugin_' + p.name} dispatch={dispatch} appState={appState}/>;
  }

  function renderPluginByName(name: string){
    if (pluginsByName.has(name)){
      const p = pluginsByName.get(name);
      if (typeof p !== 'undefined'){
        return renderPlugin(p);
      }
    } 
    return null;
  }

  function renderAllPlugin(){
    console.log("Rendering all plugins")
    if (enabledPlugins.length === 0){
      return (
        <div className={style.plugins_container}>
          No Plugins Configured.
        </div>
      );
    } else if (enabledPlugins.length > 0){
      const tabList = enabledPlugins.map((p, i) => {
        return {
          title: p.name,
          body : () => renderPlugin(p),
        }
      });

      return (
        <div className={style.plugins_container}>
          <Tab tabs={tabList} activeTabIndex={0}></Tab>
        </div>
      );
    }
    return null
  }


  function customRender(areaName: string){
      // Rendering based on customized layout setup.

      // Disable this area
      if (projectConfig['layoutConfigs'][areaName]  === 'disable'){
        return null
      }

      // Render Plugins.
      if (projectConfig['layoutConfigs'][areaName]  === 'plugins'){
        return renderAllPlugin();
      }       
  
      if (pluginsByName.has(projectConfig['layoutConfigs'][areaName])){
          return renderPluginByName(projectConfig['layoutConfigs'][areaName])
      } 
  
      return <span>Invalid component</span>          
  }

  function MiddleCenterArea(){
    const areaName = 'center-middle';
      if (typeof projectConfig['layoutConfigs'][areaName] === 'undefined' || projectConfig['layoutConfigs'][areaName] === 'default-nlp'){
        if (textPack){
          return ( 
            <TextArea textPack={textPack}
              annotationLegendsColored={annotationLegendsWithColor}
            />);
        }
      }

    return customRender(areaName);
  }

  function MiddleBottomArea(){
    const areaName = 'center-bottom';
    // When not specific plugin is defined, center bottom is 
    if (typeof projectConfig['layoutConfigs'][areaName] === 'undefined'){
      const Comp = groupPlugin.component;
      return <Comp key={groupPlugin.name} dispatch={dispatch} appState={appState} />;
    }

    return customRender(areaName);
  }

  function LeftArea(){
    const areaName = 'left';

    if (typeof projectConfig['layoutConfigs'][areaName] === 'undefined' || projectConfig['layoutConfigs'][areaName] === 'default-meta'){
      if (textPack && ontology){
        return ( 
          <div className={style.metadata_side_container}>
            <TextDetail
              annotationLegends={annotationLegendsWithColor}
              linkLegends={linksLegendsWithColor}
              attributes={attributes}
              ontology={ontology}
            />
          </div>      
        );
      }
    }
    return customRender(areaName);
  }

  function RightArea(){
    const areaName = 'right';

    if (projectConfig['layoutConfigs'][areaName] === 'example' || projectConfig['layoutConfigs'][areaName] === 'default-attribute'){
      if (textPack && ontology){
        return (
          <div className={style.attributes_side_container}>
            {linkEditIsCreating && (
              <div>
                <h2>Create Link</h2>
                <LinkCreateBox
                  fromEntryId={linkEditFromEntryId}
                  toEntryId={linkEditToEntryId}
                  ontology={ontology}
                  onEvent={onEvent}
                />
              </div>
            )}

            {annoEditIsCreating && annoEditCursorBegin !== null && (
              <div className={style.link_edit_container}>
                <AnnotationCreateBox
                  cursorBegin={annoEditCursorBegin}
                  cursorEnd={annoEditCursorEnd}
                  ontology={ontology}
                  onEvent={onEvent}
                />
              </div>
            )}

            {selectedLink && (
              <div>
                <h2>Link Attributes</h2>
                <LinkDetail link={selectedLink} onEvent={onEvent} />
              </div>
            )}

            {selectedAnnotation && (
              <div>
                <h2>Annotation Attributes</h2>
                <AnnotationDetail
                  parentAnnotations={selectedAnnotationParents}
                  childAnnotations={selectedAnnotationChildren}
                  annotation={selectedAnnotation}
                  onEvent={onEvent}
                />
              </div>
            )}
          </div>
        )
      }
    }

    return customRender(areaName);
  }

  function ToolBar(){
    if (typeof projectConfig['layoutConfigs']['center-middle'] === 'undefined' || projectConfig['layoutConfigs']['center-middle'] === 'default-nlp'){
      if (textPack && ontology && projectConfig){
        return(
          <div className={style.tool_bar_container}>
          <div className={style.add_annotation_container}>
            <button
              className={style.add_annotation_button}
              onClick={() => {
                dispatch({
                  type: annoEditIsCreating
                    ? 'exit-annotation-edit'
                    : 'start-annotation-edit',
                });
              }}
            >
              {annoEditIsCreating
                ? `Cancel add annotation`
                : `Add annotation`}
            </button>
            
            {/* next and prev document */}
            <button
              onClick={() => {
                if(doc_id !== prev_id){
                  let prev_url = '/documents/' + prev_id;
                  window.location.href=prev_url;
                }else{
                  alert('This is the first document of the project.')
                }
              }}
            >
              { `< Previous document`}
            </button>
            
            <button
              onClick={() => {
                if(doc_id !== next_id){
                  let next_url = '/documents/' + next_id;
                  window.location.href=next_url;
                }else{
                  alert('This is the last document of the project.')
                }
              }}
            >
              { `Next document >`}
            </button>

            {annoEditIsCreating && (
              <div className={style.button_action_description}>
                select text to add annotation
              </div>
            )}
          </div>

          <div className={style.scope_selector_container}>
            <span>Scope:</span>
            <ScopeSelector
              ontology={ontology}
              selectedScopeId={selectedScopeId}
              selectedScopeIndex={selectedScopeIndex}
              scopeConfig={projectConfig.scopeConfigs}
            />

            {selectedScopeId !== null && (
              <div className={style.scope_nav_container}>
                <button
                  disabled={selectedScopeIndex === 0}
                  onClick={() => dispatch({ type: 'prev-scope-item' })}
                >
                  ←
                </button>
                <button
                  disabled={
                    selectedScopeIndex ===
                    textPack.annotations.filter(
                      ann => ann.legendId === selectedScopeId
                    ).length -
                      1
                  }
                  onClick={() => dispatch({ type: 'next-scope-item' })}
                >      
                  →       
                </button>
              </div>
            )}
          </div>
        </div>
        );
      }
    }
    if (projectConfig['layoutConfigs']['center-middle'] === 'example'){
      return <span>Example component</span>
    }  
    return <div></div>
  }

return (
    <div className={style.text_viewer}>
      <main className={style.layout_container}>
          {LeftArea()}
          <div className={`${style.center_area_container}
              ${annoEditIsCreating && style.is_adding_annotation}`}
          >
            <ToolBar/>
            <div className={`${style.text_area_container}`}>
                {MiddleCenterArea()}
            </div>
            {MiddleBottomArea()}
        </div>
        {RightArea()}
      </main>
    </div>
  );
}

export default TextViewer;
