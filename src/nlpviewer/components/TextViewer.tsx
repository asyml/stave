import React from 'react';
import style from '../styles/TextViewer.module.css';
import { IAnnotation, IPlugin } from '../lib/interfaces';
import { applyColorToLegend } from '../lib/utils';
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

export type OnEventType = (event: any) => void;

export interface TextViewerProp {
  plugins: IPlugin[];
  onEvent?: OnEventType;
}

function TextViewer({ plugins, onEvent }: TextViewerProp) {
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

  if (!textPack || !ontology) return null;

  const { annotations, legends, links, attributes } = textPack;
  const annotationLegendsWithColor = applyColorToLegend(legends.annotations);
  const linksLegendsWithColor = applyColorToLegend(legends.links);

  const selectedAnnotation =
    annotations.find(ann => ann.id === selectedAnnotationId) || null;
  const selectedAnnotaionParents: IAnnotation[] = [];
  const selectedAnnotaionChildren: IAnnotation[] = [];

  links.forEach(link => {
    if (link.fromEntryId === selectedAnnotationId) {
      selectedAnnotaionChildren.push(
        annotations.find(ann => ann.id === link.toEntryId) as IAnnotation
      );
    } else if (link.toEntryId === selectedAnnotationId) {
      selectedAnnotaionParents.push(
        annotations.find(ann => ann.id === link.fromEntryId) as IAnnotation
      );
    }
  });

  const selectedLink = links.find(link => link.id === selectedLinkId) || null;
  const enabledPlugins = plugins.filter(p => p.enabled(appState));

  return (
    <div className={style.text_viewer}>
      <main className={style.layout_container}>
        <div className={style.metadata_side_container}>
          <TextDetail
            annotationLegends={annotationLegendsWithColor}
            linkLegends={linksLegendsWithColor}
            attributes={attributes}
            ontology={ontology}
          />
        </div>

        <div
          className={`${style.center_area_container} 
            ${annoEditIsCreating && style.is_adding_annotation}`}
        >
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
              />
            </div>
          </div>

          <div className={`${style.text_area_container}`}>
            <TextArea
              textPack={textPack}
              annotationLegendsColored={annotationLegendsWithColor}
            />
          </div>

          {enabledPlugins.length ? (
            <div className={style.plugins_container}>
              {enabledPlugins.map((p, i) => {
                const Comp = p.component;
                return <Comp key={i} dispatch={dispatch} appState={appState} />;
              })}
            </div>
          ) : null}
        </div>

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
                parentAnnotations={selectedAnnotaionParents}
                childAnnotations={selectedAnnotaionChildren}
                annotation={selectedAnnotation}
                onEvent={onEvent}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TextViewer;
