import React from 'react';
import style from '../styles/TextViewer.module.css';
import { ISinglePack } from '../lib/interfaces';
import { applyColorToLegend } from '../lib/utils';
import AnnotationDetail from './AnnotationDetail';
import TextDetail from './TextDetail';
import TextArea from './TextArea';
import { useTextViewerState } from '../contexts/text-viewer.context';

export interface TextViewerProp {
  textPack: ISinglePack;
}

function TextViewer({ textPack }: TextViewerProp) {
  const { annotations, legends, attributes } = textPack;

  const legendsWithColor = applyColorToLegend(legends);
  const contextState = useTextViewerState();
  const selectedAnnotation =
    annotations.find(ann => ann.id === contextState.selectedAnnotationId) ||
    null;

  return (
    <div className={style.text_viewer}>
      <header className={style.layout_header}>NLP Viewer</header>

      <main className={style.layout_container}>
        <div className={style.metadata_side_container}>
          <TextDetail legends={legendsWithColor} attributes={attributes} />
        </div>

        <TextArea textPack={textPack} />

        <div className={style.attributes_side_container}>
          <AnnotationDetail annotation={selectedAnnotation} />
        </div>
      </main>
    </div>
  );
}

export default TextViewer;
