import React, { useRef, useEffect, useState } from 'react';
import style from '../styles/TextViewer.module.css';
import { ISinglePack } from '../lib/interfaces';
import { applyColorToLegend, notNullOrUndefined } from '../lib/utils';
import Annotation from './Annotation';
import AnnotationDetail from './AnnotationDetail';
import TextDetail from './TextDetail';
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
  const { annotations, legends, text, attributes, links } = textPack;
  const inputEl = useRef<HTMLDivElement>(null);
  const [annotationPositions, setAnnotationPositions] = useState<
    AnnotationPosition[]
  >([]);
  const legendsWithColor = applyColorToLegend(legends);

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
            height: rect.height,
          })),
        };
      });

      setAnnotationPositions(annotationBlocks);
    }
  }, [annotations]);

  const annotationWithPosition = (annotationPositions || []).map(
    (position, i) => {
      return {
        position,
        annotation: annotations[i],
      };
    }
  );

  // TODO: this is assuming link is only between entry
  const linkWithPosition = links
    .map(link => {
      const fromEntryWithPosition = annotationWithPosition.find(
        ann => ann.annotation.id === link.fromEntryId
      );
      const toEntryWithPosition = annotationWithPosition.find(
        ann => ann.annotation.id === link.toEntryId
      );

      if (fromEntryWithPosition && toEntryWithPosition) {
        return {
          link,
          fromEntryWithPos: fromEntryWithPosition,
          toEntryWithPos: toEntryWithPosition,
        };
      } else {
        return null;
      }
    })
    .filter(notNullOrUndefined);

  const selectedAnnotation =
    annotations.find(ann => ann.id === state.selectedAnnotationId) || null;

  return (
    <div className={style.text}>
      <header className={style.layout_header}>NLP Viewer</header>

      <main className={style.layout_container}>
        <div className={style.metadata_side_container}>
          <TextDetail legends={legendsWithColor} attributes={attributes} />
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
                const legend = legendsWithColor.find(
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

          <div className="links-container">
            {linkWithPosition.map(linkPos => {
              if (
                linkPos.fromEntryWithPos.position.rects.length === 1 &&
                linkPos.toEntryWithPos.position.rects.length === 1 &&
                linkPos.fromEntryWithPos.position.rects[0].y ===
                  linkPos.toEntryWithPos.position.rects[0].y
              ) {
                const fromX = linkPos.fromEntryWithPos.position.rects[0].x;
                const fromWidth =
                  linkPos.fromEntryWithPos.position.rects[0].width;

                const toX = linkPos.toEntryWithPos.position.rects[0].x;
                const toWidth = linkPos.toEntryWithPos.position.rects[0].width;

                let x, width;
                if (toX > fromX) {
                  x = fromX + fromWidth / 2;
                  width = toX + toWidth / 2 - (fromX + fromWidth / 2);
                } else {
                  x = toX + toWidth / 2;
                  width = fromX + fromWidth / 2 - (toX + toWidth / 2);
                }
                const y = linkPos.fromEntryWithPos.position.rects[0].y - 10;
                const height = 10;

                return (
                  <div
                    key={linkPos.link.id}
                    data-from-id={linkPos.link.fromEntryId}
                    data-to-id={linkPos.link.toEntryId}
                    style={{
                      height,
                      width,
                      transform: `translate(${x}px,${y}px)`,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      border: '1px solid #555',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      borderBottom: 0,
                    }}
                  ></div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>

        <div className={style.attributes_side_container}>
          <AnnotationDetail annotation={selectedAnnotation} />
        </div>
      </main>
    </div>
  );
}

export default TextViewer;
