import React from 'react';
import style from '../styles/TextViewer.module.css';
import { ISinglePack, IOntology } from '../lib/interfaces';
import { applyColorToLegend } from '../lib/utils';
import AnnotationDetail from './AnnotationDetail';
import TextDetail from './TextDetail';
import TextArea from './TextArea';
import { useTextViewerState } from '../contexts/text-viewer.context';

export interface TextViewerProp {
  textPack: ISinglePack;
  ontology: IOntology;
}

function TextViewer({ textPack, ontology }: TextViewerProp) {
  const { annotations, legends, attributes } = textPack;

  const annotationLegendsWithColor = applyColorToLegend(legends.annotations);
  const linksLegendsWithColor = applyColorToLegend(legends.links);
  const contextState = useTextViewerState();
  const selectedAnnotation =
    annotations.find(ann => ann.id === contextState.selectedAnnotationId) ||
    null;

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
          <AnnotationDetail annotation={selectedAnnotation} />
        </div>
      </main>
    </div>
  );
}

export default TextViewer;
