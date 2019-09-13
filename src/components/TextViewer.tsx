import React, { useRef, useEffect, useState } from 'react';
import style from '../styles/TextViewer.module.css';
import { ISinglePack } from '../lib/interfaces';
import Annotation from './Annotation';
import AnnotationAttribute from './AnnotationAttribute';
import TextAttribute from './TextAttribute';
import { useTextViewerState } from '../contexts/text-viewer.context';

export interface TextViewerProp {
  textPack: ISinglePack;
}

export interface AnnotationPosition {
  rects: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
}

function TextViewer({ textPack }: TextViewerProp) {
  const { annotations, legends, text, metadata } = textPack;
  const inputEl = useRef<HTMLDivElement>(null);
  const [annotationPositions, setAnnotationPositions] = useState<
    AnnotationPosition[]
  >([]);

  const state = useTextViewerState();

  useEffect(() => {
    if (inputEl.current && inputEl.current) {
      const textNode = inputEl.current && inputEl.current.childNodes[0];

      const annotationBlocks = annotations.map(anno => {
        const range = document.createRange();
        range.setStart(textNode, anno.span.begin);
        range.setEnd(textNode, anno.span.end);
        const rects = Array.from(range.getClientRects() as DOMRectList);
        return {
          rects: rects.map(rect => ({
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
          }))
        };
      });

      setAnnotationPositions(annotationBlocks);
    }
  }, [annotations]);

  const annotationWithPosition = (annotationPositions || []).map(
    (position, i) => {
      return {
        position,
        annotation: annotations[i]
      };
    }
  );

  const selectedAnnotation =
    annotations.find(ann => ann.id === state.selectedAnnotationId) || null;

  return (
    <div className={style.text}>
      <header className={style.layout_header}>NLP Viewer</header>

      <main className={style.layout_container}>
        <div className={style.metadata_side_container}>
          <TextAttribute legends={legends} metadata={metadata} />
        </div>

        <div className={style.main_container}>
          <div className={style.text_container} ref={inputEl}>
            {text}
          </div>

          <div className={style.annotation_container}>
            {annotationWithPosition
              .filter(
                ann =>
                  state.selectedLegendIds.indexOf(ann.annotation.legendId) > -1
              )
              .map((ann, i) => {
                const legend = legends.find(
                  legend => legend.id === ann.annotation.legendId
                );

                if (!legend) {
                  return null;
                }

                return (
                  <Annotation
                    key={i}
                    annotation={ann.annotation}
                    isSelected={
                      ann.annotation.id === state.selectedAnnotationId
                    }
                    legend={legend}
                    position={ann.position}
                  />
                );
              })}
          </div>
        </div>

        <div className={style.attributes_side_container}>
          <AnnotationAttribute annotation={selectedAnnotation} />
        </div>
      </main>
    </div>
  );
}

export default TextViewer;
