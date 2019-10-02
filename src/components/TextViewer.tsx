import React from 'react';
import style from '../styles/TextViewer.module.css';
import { ISinglePack, IOntology, IAnnotation } from '../lib/interfaces';
import { applyColorToLegend } from '../lib/utils';
import AnnotationDetail from './AnnotationDetail';
import LinkDetail from './LinkDetail';
import TextDetail from './TextDetail';
import TextArea from './TextArea';
import { useTextViewerState } from '../contexts/text-viewer.context';

export interface TextViewerProp {
  textPack: ISinglePack;
  ontology: IOntology;
}

function TextViewer({ textPack, ontology }: TextViewerProp) {
  const { annotations, legends, links, attributes } = textPack;

  const annotationLegendsWithColor = applyColorToLegend(legends.annotations);
  const linksLegendsWithColor = applyColorToLegend(legends.links);
  const contextState = useTextViewerState();
  const selectedAnnotation =
    annotations.find(ann => ann.id === contextState.selectedAnnotationId) ||
    null;
  const selectedAnnotaionParents: IAnnotation[] = [];
  const selectedAnnotaionChildren: IAnnotation[] = [];

  links.forEach(link => {
    if (link.fromEntryId === contextState.selectedAnnotationId) {
      selectedAnnotaionChildren.push(annotations.find(
        ann => ann.id === link.toEntryId
      ) as IAnnotation);
    } else if (link.toEntryId === contextState.selectedAnnotationId) {
      selectedAnnotaionParents.push(annotations.find(
        ann => ann.id === link.fromEntryId
      ) as IAnnotation);
    }
  });

  const selectedLink =
    links.find(link => link.id === contextState.selectedLinkId) || null;

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

        <div className={style.text_area_container}>
          <TextArea textPack={textPack} />
        </div>

        <div className={style.attributes_side_container}>
          {selectedLink ? (
            <LinkDetail link={selectedLink} />
          ) : (
            <AnnotationDetail
              parentAnnotations={selectedAnnotaionParents}
              childAnnotations={selectedAnnotaionChildren}
              annotation={selectedAnnotation}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default TextViewer;
