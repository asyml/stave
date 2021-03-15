import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Pagination from '@material-ui/lab/Pagination';
import Tab from './Tab';
import style from '../styles/TextViewer.module.css';
import {
  IAnnotation,
  IPlugin,
  IProjectConfigs,
  IDocuments,
} from '../lib/interfaces';
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
import {FormControlLabel} from '@material-ui/core';
import { NLPViewerOptions } from '..';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type OnEventType = (event: any) => void;

export interface TextViewerProp {
  plugins: IPlugin[];
  onEvent?: OnEventType;
  projectConfig: IProjectConfigs;
  documents: IDocuments;
  options?: NLPViewerOptions;
}

function TextViewer({
  plugins,
  onEvent,
  projectConfig,
  documents,
  options
}: TextViewerProp) {
  const appState = useTextViewerState();
  const dispatch = useTextViewerDispatch();

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

  const doc_id = window.location.pathname.split('/').pop()!;

  const {annotations, links, attributes} = textPack;

  const annotationLegendsWithColor = applyColorToLegend(
    ontology.definitions.filter(
      entry =>
        isEntryAnnotation(ontology, entry.entryName) &&
        isAvailableLegend(projectConfig['legendConfigs'], entry.entryName)
    )
  );
  const linksLegendsWithColor = applyColorToLegend(
    ontology.definitions.filter(
      entry =>
        isEntryLink(ontology, entry.entryName) &&
        isAvailableLegend(projectConfig['legendConfigs'], entry.entryName)
    )
  );

  const selectedAnnotation =
    annotations.find(ann => ann.id === selectedAnnotationId) || null;
  const selectedAnnotationParents: IAnnotation[] = [];
  const selectedAnnotationChildren: IAnnotation[] = [];

  links.forEach(link => {
    if (link.fromEntryId === selectedAnnotationId) {
      const anno = annotations.find(ann => ann.id === link.toEntryId);
      if (anno) selectedAnnotationChildren.push(anno);
    } else if (link.toEntryId === selectedAnnotationId) {
      const anno = annotations.find(ann => ann.id === link.fromEntryId);
      if (anno) selectedAnnotationParents.push(anno);
    }
  });

  const selectedLink = links.find(link => link.id === selectedLinkId) || null;
  const enabledPlugins = plugins.filter(p => p.enabled(appState));

  const pluginsByName = new Map<string, IPlugin>(
    enabledPlugins.map(p => [p.name, p])
  );

  function renderPlugin(p: IPlugin) {
    const Comp = p.component;
    return (
      <Comp key={'plugin_' + p.name} dispatch={dispatch} appState={appState} />
    );
  }

  function renderPluginByName(name: string) {
    if (pluginsByName.has(name)) {
      const p = pluginsByName.get(name);
      if (typeof p !== 'undefined') {
        return renderPlugin(p);
      }
    }
    return null;
  }

  function renderAllPlugin() {
    console.log('Rendering all plugins');
    if (enabledPlugins.length === 0) {
      return (
        <div className={style.plugins_container}>No Plugins Configured.</div>
      );
    } else if (enabledPlugins.length > 0) {
      const tabList = enabledPlugins.map(p => {
        return {
          title: p.name,
          body: () => renderPlugin(p),
        };
      });

      return (
        <div className={style.plugins_container}>
          <Tab tabs={tabList} activeTabIndex={0}></Tab>
        </div>
      );
    }
    return null;
  }

  function customRender(areaName: string) {
    // Rendering based on customized layout setup.

    // Disable this area
    if (projectConfig['layoutConfigs'][areaName] === 'disable') {
      return null;
    }

    // Render Plugins.
    if (projectConfig['layoutConfigs'][areaName] === 'plugins') {
      return renderAllPlugin();
    }

    if (pluginsByName.has(projectConfig['layoutConfigs'][areaName])) {
      return renderPluginByName(projectConfig['layoutConfigs'][areaName]);
    }

    return <span>Invalid component</span>;
  }

  function MiddleCenterArea() {
    const areaName = 'center-middle';
    if (
      typeof projectConfig['layoutConfigs'][areaName] === 'undefined' ||
      projectConfig['layoutConfigs'][areaName] === 'default-nlp'
    ) {
      if (textPack) {
        return (
          <TextArea
            textPack={textPack}
            annotationLegendsColored={annotationLegendsWithColor}
          />
        );
      }
    }

    return customRender(areaName);
  }

  function MiddleBottomArea() {
    const areaName = 'center-bottom';
    return customRender(areaName);
  }

  function LeftArea() {
    const areaName = 'left';

    if (
      typeof projectConfig['layoutConfigs'][areaName] === 'undefined' ||
      projectConfig['layoutConfigs'][areaName] === 'default-meta'
    ) {
      if (textPack && ontology) {
        return (
          <div className={style.metadata_side_container}>
            <h1 className={style.anno_legends_heading}>Annotation Legends</h1>
            <div className={style.anno_legends_sub}>
              <p>
                See the summary visualiations of annotations and explore them
                in-situ.
                <br /> Select edit to change them.
              </p>
            </div>
            {(options && options.allowEditAnnotations) &&  (
              <div className={style.add_annotation_container}>
                <FormControlLabel
                  control={
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={
                        <CheckBoxIcon fontSize="small" htmlColor="#246ED6" />
                      }
                      size="small"
                      checked={annoEditIsCreating}
                      onChange={() => {
                        dispatch({
                          type: annoEditIsCreating
                            ? 'exit-annotation-edit'
                            : 'start-annotation-edit',
                        });
                      }}
                      inputProps={{'aria-label': 'Edit annotations checkbox'}}
                    />
                  }
                  label="Edit annotations"
                />
                {annoEditIsCreating && (
                  <div className={style.button_action_description}>
                    select text to add annotation
                  </div>
                )}
              </div>
            )}
            <TextDetail
              annotationLegends={annotationLegendsWithColor}
              linkLegends={linksLegendsWithColor}
              attributes={attributes}
            />
          </div>
        );
      }
    }
    return customRender(areaName);
  }

  function RightArea() {
    const areaName = 'right';

    if (
      typeof projectConfig['layoutConfigs'][areaName] === 'undefined' ||
      projectConfig['layoutConfigs'][areaName] === 'default-attribute'
    ) {
      if (textPack && ontology) {
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
        );
      }
    }

    return customRender(areaName);
  }

  function ToolBar() {
    let scopeCount = 0;
    const isFullText = selectedScopeId === null && documents !== null;
    let paginationIndex = selectedScopeIndex;
    if (isFullText) {
      scopeCount = documents.documents.length;
      paginationIndex = documents.documents.findIndex(
        x => x.id === parseInt(doc_id)
      );
    } else if (textPack) {
      scopeCount = textPack.annotations.filter(
        ann => ann.legendId === selectedScopeId
      ).length;
    }
    const handlePageChange = (
      event: React.ChangeEvent<unknown>,
      value: number
    ) => {
      if (value - 1 === paginationIndex) {
        return;
      } else {
        if (isFullText) {
          // The scope selected is set to Full Text, so paginate through project's documents
          window.location.href = `/documents/${
            documents.documents[value - 1].id
          }`;
        } else {
          // Scope selector was set to a scope other than Full text
          dispatch({type: 'set-scope-index', scopeIndex: value - 1});
        }
      }
    };

    if (
      typeof projectConfig['layoutConfigs']['center-middle'] === 'undefined' ||
      projectConfig['layoutConfigs']['center-middle'] === 'default-nlp'
    ) {
      if (textPack && ontology && projectConfig) {
        return (
          <div className={style.tool_bar_container}>
            <div className={style.scope_selector_container}>
              <ScopeSelector
                ontology={ontology}
                selectedScopeId={selectedScopeId}
                scopeConfig={projectConfig.scopeConfigs}
              />

              {(selectedScopeId !== null ||
                (selectedScopeId === null &&
                  documents &&
                  documents.documents.length > 1)) && (
                <div className={style.scope_nav_container}>
                  <Pagination
                    page={paginationIndex + 1}
                    onChange={handlePageChange}
                    count={scopeCount}
                    defaultPage={1}
                    variant="outlined"
                    shape="rounded"
                  />
                </div>
              )}
            </div>
          </div>
        );
      }
    }
    if (projectConfig['layoutConfigs']['center-middle'] === 'example') {
      return <span>Example component</span>;
    }
    return <div></div>;
  }

  return (
    <div className={style.text_viewer}>
      <main className={style.layout_container}>
        {LeftArea()}
        <div
          className={`${style.center_area_container}
              ${annoEditIsCreating && style.is_adding_annotation}`}
        >
          {((options && options.enableScopeSelector) && (<ToolBar />) )}
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
