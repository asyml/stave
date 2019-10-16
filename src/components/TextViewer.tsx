import React from 'react';
import style from '../styles/TextViewer.module.css';
import { ISinglePack, IOntology, IAnnotation } from '../lib/interfaces';
import { applyColorToLegend } from '../lib/utils';
import AnnotationDetail from './AnnotationDetail';
import LinkDetail from './LinkDetail';
import TextDetail from './TextDetail';
import TextArea from './TextArea';
import {
  useTextViewerState,
  useTextViewerDispatch,
} from '../contexts/text-viewer.context';
import LinkCreateBox from './LinkCreateBox';
import AnnotationCreateBox from './AnnotationCreateBox';

export interface TextViewerProp {
  textPack: ISinglePack;
  ontology: IOntology;
}

function TextViewer({ textPack, ontology }: TextViewerProp) {
  const { annotations, legends, links, attributes } = textPack;

  const annotationLegendsWithColor = applyColorToLegend(legends.annotations);
  const linksLegendsWithColor = applyColorToLegend(legends.links);
  const {
    selectedAnnotationId,
    selectedLinkId,
    linkEditFromEntryId,
    linkEditToEntryId,
    linkEditIsCreating,

    annoEditIsCreating,
    annoEditCursorBegin,
    annoEditCursorEnd,
  } = useTextViewerState();
  const dispatch = useTextViewerDispatch();

  const selectedAnnotation =
    annotations.find(ann => ann.id === selectedAnnotationId) || null;
  const selectedAnnotaionParents: IAnnotation[] = [];
  const selectedAnnotaionChildren: IAnnotation[] = [];

  links.forEach(link => {
    if (link.fromEntryId === selectedAnnotationId) {
      selectedAnnotaionChildren.push(annotations.find(
        ann => ann.id === link.toEntryId
      ) as IAnnotation);
    } else if (link.toEntryId === selectedAnnotationId) {
      selectedAnnotaionParents.push(annotations.find(
        ann => ann.id === link.fromEntryId
      ) as IAnnotation);
    }
  });

  const selectedLink = links.find(link => link.id === selectedLinkId) || null;

  return (
    <div className={style.text_viewer}>
      <header className={style.layout_header}>NLP Viewer</header>

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
          className={`${style.text_area_container} 
            ${annoEditIsCreating && style.is_adding_annotation}`}
        >
          <div className={style.add_annotation_button_container}>
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
              {annoEditIsCreating ? `Exit annotate` : `Start annotate`}
            </button>

            {annoEditIsCreating && (
              <span className={style.add_annotation_button_desc}>
                select text to add annotation
              </span>
            )}
          </div>
          <TextArea textPack={textPack} />
        </div>

        <div className={style.attributes_side_container}>
          {linkEditIsCreating && (
            <div>
              <h2>Create Link</h2>
              <LinkCreateBox
                fromEntryId={linkEditFromEntryId}
                toEntryId={linkEditToEntryId}
                ontology={ontology}
              />
            </div>
          )}

          {annoEditIsCreating && annoEditCursorBegin !== null && (
            <div className={style.link_edit_container}>
              <AnnotationCreateBox
                cursorBegin={annoEditCursorBegin}
                cursorEnd={annoEditCursorEnd}
                ontology={ontology}
              />
            </div>
          )}

          {selectedLink && (
            <div>
              <h2>Link Attributes</h2>
              <LinkDetail link={selectedLink} />
            </div>
          )}

          {selectedAnnotation && (
            <div>
              <h2>Annotation Attributes</h2>
              <AnnotationDetail
                parentAnnotations={selectedAnnotaionParents}
                childAnnotations={selectedAnnotaionChildren}
                annotation={selectedAnnotation}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default TextViewer;
