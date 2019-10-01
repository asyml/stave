import React, { useRef, useEffect, useState } from 'react';
import style from '../styles/TextArea.module.css';
import {
  ISinglePack,
  AnnotationPosition,
  ISpacedAnnotationSpan,
} from '../lib/interfaces';
import {
  applyColorToLegend,
  calcuateLinesLevels,
  calcuateLinkHeight,
  shouldMultiLineGoLeft,
  attributeId,
} from '../lib/utils';
import {
  spaceOutText,
  mergeLinkWithPosition,
  mergeAnnotationWithPosition,
} from '../lib/text-spacer';
import Annotation from './Annotation';
import {
  useTextViewerState,
  useTextViewerDispatch,
} from '../contexts/text-viewer.context';
import { throttle } from 'lodash-es';

export interface TextAreaProp {
  textPack: ISinglePack;
}
export interface TextNodeDimension {
  width: number;
  height: number;
  x: number;
  y: number;
}

function TextArea({ textPack }: TextAreaProp) {
  const { annotations, legends, text, links } = textPack;
  const textNodeEl = useRef<HTMLDivElement>(null);
  const textAreaEl = useRef<HTMLDivElement>(null);
  const [annotationPositions, setAnnotationPositions] = useState<
    AnnotationPosition[]
  >([]);

  const [textNodeDimension, setTextNodeDimension] = useState<TextNodeDimension>(
    {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }
  );

  const annotaionLegendsWithColor = applyColorToLegend(legends.annotations);

  const dispatch = useTextViewerDispatch();
  const {
    selectedLegendIds,
    selectedAnnotationId,
    selectedLegendAttributeIds,
    spacingCalcuated,

    spacedAnnotationSpan,
    spacedText,
  } = useTextViewerState();

  useEffect(() => {
    function calculateTextSpace(
      textPack: ISinglePack,
      selectedLegendIds: string[],
      selectedLegendAttributeIds: string[],
      spacingCalcuated: boolean,
      spacedAnnotationSpan: ISpacedAnnotationSpan
    ) {
      if (!spacingCalcuated) {
        const { text, annotationSpanMap } = spaceOutText(
          textPack,
          selectedLegendIds,
          selectedLegendAttributeIds
        );

        dispatch({
          type: 'set-spaced-annotation-span',
          spacedAnnotationSpan: annotationSpanMap,
          spacedText: text,
        });
      }

      if (textNodeEl.current && textAreaEl.current) {
        const textNode = textNodeEl.current && textNodeEl.current.childNodes[0];
        const textAreaRect = textAreaEl.current.getBoundingClientRect();
        const textNodeRect = textNodeEl.current.getBoundingClientRect();

        const textAreaDimension = {
          width: textNodeRect.width,
          height: textNodeRect.height,
          x: textNodeRect.left - textAreaRect.left,
          y: textNodeRect.top - textAreaRect.top,
        };

        const annotationPositions = textPack.annotations.map(anno => {
          const range = document.createRange();

          range.setStart(
            textNode,
            spacedAnnotationSpan[anno.id]
              ? spacedAnnotationSpan[anno.id].begin
              : anno.span.begin
          );
          range.setEnd(
            textNode,
            spacedAnnotationSpan[anno.id]
              ? spacedAnnotationSpan[anno.id].end
              : anno.span.end
          );
          const rects = Array.from(range.getClientRects() as DOMRectList);

          return {
            rects: rects.map(rect => ({
              x: rect.x - textAreaRect.left,
              y: rect.y - textAreaRect.top,
              width: rect.width,
              height: rect.height,
            })),
          };
        });

        setAnnotationPositions(annotationPositions);
        setTextNodeDimension(textAreaDimension);
      }
    }

    const handleWindowResize = throttle(() => {
      dispatch({
        type: 'reset-calculated-text-space',
      });
    }, 100);

    calculateTextSpace(
      textPack,
      selectedLegendIds,
      selectedLegendAttributeIds,
      spacingCalcuated,
      spacedAnnotationSpan
    );

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [
    textPack,
    selectedLegendIds,
    selectedLegendAttributeIds,
    spacingCalcuated,
    spacedAnnotationSpan,
    dispatch,
  ]);

  const annotationWithPosition = mergeAnnotationWithPosition(
    annotationPositions,
    annotations
  ).filter(ann => selectedLegendIds.indexOf(ann.annotation.legendId) > -1);

  const linksWithPos = mergeLinkWithPosition(
    links,
    annotationWithPosition
  ).filter(link => selectedLegendIds.indexOf(link.link.legendId) > -1);

  const lineStartX = textNodeDimension.x;
  const lineWidth = textNodeDimension.width;
  const textLinkDistance = 8;
  const linkGap = 8;
  const borderRadius = 8;

  const linesLevels = calcuateLinesLevels(linksWithPos, lineStartX, lineWidth);
  const linkHeight = calcuateLinkHeight(linesLevels, linkGap);

  return (
    <div
      className={style.text_area_container}
      ref={textAreaEl}
      style={{
        opacity: spacingCalcuated ? 1 : 0,
      }}
    >
      <div className={style.text_node_container} ref={textNodeEl}>
        {spacedText || text}
      </div>

      <div className={style.annotation_container}>
        {annotationWithPosition.map((ann, i) => {
          const legend = annotaionLegendsWithColor.find(
            legend => legend.id === ann.annotation.legendId
          );

          if (!legend) {
            return null;
          }

          return (
            <Annotation
              key={i}
              annotation={ann.annotation}
              isSelected={ann.annotation.id === selectedAnnotationId}
              legend={legend}
              position={ann.position}
            />
          );
        })}
      </div>

      <div className="annotation_label_container">
        {annotationWithPosition.map((ann, i) => {
          const legend = annotaionLegendsWithColor.find(
            legend => legend.id === ann.annotation.legendId
          );

          if (!legend) {
            return null;
          }

          const isSelected = ann.annotation.id === selectedAnnotationId;
          const attrKeys = Object.keys(ann.annotation.attributes).filter(
            attrKey => {
              return (
                selectedLegendAttributeIds.indexOf(
                  attributeId(ann.annotation.legendId, attrKey)
                ) > -1
              );
            }
          );

          return (
            <div
              key={ann.annotation.id}
              style={{
                position: 'absolute',
                zIndex: isSelected ? 10 : 0,
                transform: `translate(-50%, 0)`,
                top: ann.position.rects[0].y + 20,
                left: ann.position.rects[0].x + ann.position.rects[0].width / 2,
              }}
            >
              {ann.position.rects.map((rect, i) => {
                return attrKeys.map((attrKey, j) => {
                  return (
                    <div
                      className={style.annotation_attr_rect}
                      key={attrKey + i}
                      style={{
                        padding: '0 4px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        fontSize: 10,
                        border: '1px solid #ccc',
                        backgroundColor: 'white',
                        ...(isSelected
                          ? {
                              display: 'inline-block',
                              marginRight: j === attrKeys.length - 1 ? 0 : 4,
                              boxShadow: '0 3px 8px rgba(0, 0, 0, .3)',
                            }
                          : {
                              position: j > 0 ? 'absolute' : 'relative',
                              top: j * 2,
                              left: j * 2,
                            }),
                      }}
                    >
                      {ann.annotation.attributes[attrKey]
                        .substring(0, 3)
                        .toUpperCase()}
                    </div>
                  );
                });
              })}
            </div>
          );
        })}
      </div>

      <div className="links-container">
        {linksWithPos.map(linkPos => {
          if (linkPos.fromLinkY === linkPos.toLinkY) {
            const height =
              textLinkDistance + linkHeight[linkPos.link.id][linkPos.fromLinkY];
            const goLeft = linkPos.fromLinkX > linkPos.toLinkX;
            const arrowRadiusAdjust = Math.max(borderRadius - height, 0) / 2;
            const arrowPosition = {
              x: goLeft
                ? linkPos.toLinkX - arrowRadiusAdjust
                : linkPos.toLinkX - 4 + arrowRadiusAdjust,
              y: linkPos.toLinkY - height - 2,
            };
            const linkLabelPosition = {
              x:
                Math.min(linkPos.fromLinkX, linkPos.toLinkX) +
                Math.abs(linkPos.fromLinkX - linkPos.toLinkX) / 2,
              y: linkPos.toLinkY - height - 4,
            };
            const linkLabel = Object.keys(linkPos.link.attributes)
              .filter(attrKey => {
                return (
                  selectedLegendAttributeIds.indexOf(
                    attributeId(linkPos.link.legendId, attrKey)
                  ) > -1
                );
              })
              .map(attrKey => linkPos.link.attributes[attrKey])
              .join(',');

            return (
              <div
                className="single-line-container"
                data-from-id={linkPos.link.fromEntryId}
                data-to-id={linkPos.link.toEntryId}
                key={linkPos.link.id}
              >
                <div
                  style={{
                    height: height,
                    width: Math.abs(linkPos.fromLinkX - linkPos.toLinkX),
                    position: 'absolute',
                    top: linkPos.fromLinkY - height,
                    left: Math.min(linkPos.fromLinkX, linkPos.toLinkX),
                    border: '1px solid #555',
                    borderTopWidth: '1px',
                    borderLeftWidth: '1px',
                    borderRightWidth: '1px',
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                    borderBottomWidth: '0px',
                  }}
                ></div>
                <div
                  className={style.arrow}
                  style={{
                    transformOrigin: 'center bottom',
                    transform: `
                        rotate(
                            ${goLeft ? '60deg' : '-60deg'})`,
                    position: 'absolute',
                    top: arrowPosition.y,
                    left: arrowPosition.x,
                  }}
                ></div>

                {linkLabel ? (
                  <div
                    className={style.link_label}
                    style={{
                      transform: `translate(-50%)`,
                      position: 'absolute',
                      textAlign: goLeft ? 'left' : 'right',
                      top: `${linkLabelPosition.y}px`,
                      left: `${linkLabelPosition.x}px`,
                    }}
                  >
                    {linkLabel}
                  </div>
                ) : null}
              </div>
            );
          } else {
            const fromLineHeight =
              textLinkDistance + linkHeight[linkPos.link.id][linkPos.fromLinkY];
            const toLineHeight =
              textLinkDistance + linkHeight[linkPos.link.id][linkPos.toLinkY];

            const goLeft = shouldMultiLineGoLeft(
              linkPos,
              lineStartX,
              lineWidth
            );
            const sideGap = 5;
            const arrowRadiusAdjust =
              Math.max(borderRadius - toLineHeight, 0) / 2;

            const arrowGoLeft = !goLeft;
            const arrowPosition = {
              x: arrowGoLeft
                ? linkPos.toLinkX - arrowRadiusAdjust
                : linkPos.toLinkX - 4 + arrowRadiusAdjust,
              y: linkPos.toLinkY - toLineHeight - 2,
            };
            const fromLineX = goLeft
              ? Math.min(linkPos.fromLinkX, lineStartX) - sideGap
              : Math.min(linkPos.fromLinkX, lineStartX + lineWidth);
            const fromLineWith = goLeft
              ? Math.abs(linkPos.fromLinkX - lineStartX) + sideGap
              : Math.abs(linkPos.fromLinkX - (lineStartX + lineWidth)) +
                sideGap;

            const toLineX = goLeft
              ? Math.min(linkPos.toLinkX, lineStartX) - sideGap
              : Math.min(linkPos.toLinkX, lineStartX + lineWidth);
            const toLineWith = goLeft
              ? Math.abs(linkPos.toLinkX - lineStartX) + sideGap
              : Math.abs(linkPos.toLinkX - (lineStartX + lineWidth)) + sideGap;

            const fromLinkLabelPosition = {
              x: fromLineX + fromLineWith / 2,
              y: linkPos.fromLinkY - fromLineHeight - 4,
            };

            const toLinkLabelPosition = {
              x: toLineX + toLineWith / 2,
              y: linkPos.toLinkY - toLineHeight - 4,
            };

            const linkLabel = Object.keys(linkPos.link.attributes)
              .filter(attrKey => {
                return (
                  selectedLegendAttributeIds.indexOf(
                    attributeId(linkPos.link.legendId, attrKey)
                  ) > -1
                );
              })
              .map(attrKey => linkPos.link.attributes[attrKey])
              .join(',');

            return (
              <div
                className="cross-line-container"
                key={linkPos.link.id}
                data-from-id={linkPos.link.fromEntryId}
                data-to-id={linkPos.link.toEntryId}
              >
                <div
                  style={{
                    height: fromLineHeight,
                    width: fromLineWith,
                    position: 'absolute',
                    top: linkPos.fromLinkY - fromLineHeight,
                    left: fromLineX,
                    border: '1px solid #555',
                    borderWidth: '1px',
                    borderTopLeftRadius: goLeft ? 0 : borderRadius,
                    borderTopRightRadius: goLeft ? borderRadius : 0,
                    borderBottomWidth: 0,
                    borderLeftWidth: goLeft ? 0 : 1,
                    borderRightWidth: goLeft ? 1 : 0,
                  }}
                ></div>
                <div
                  style={{
                    height: toLineHeight,
                    width: toLineWith,
                    position: 'absolute',
                    top: linkPos.toLinkY - toLineHeight,
                    left: toLineX,
                    border: '1px solid #555',
                    borderWidth: '1px',
                    borderTopLeftRadius: goLeft ? 0 : borderRadius,
                    borderTopRightRadius: goLeft ? borderRadius : 0,
                    borderBottomWidth: 0,
                    borderLeftWidth: goLeft ? 0 : 1,
                    borderRightWidth: goLeft ? 1 : 0,
                  }}
                ></div>
                <div
                  style={{
                    height:
                      Math.abs(
                        linkPos.toLinkY -
                          toLineHeight -
                          (linkPos.fromLinkY - fromLineHeight)
                      ) + 1,
                    width: 1,
                    position: 'absolute',
                    top: Math.min(
                      linkPos.toLinkY - toLineHeight,
                      linkPos.fromLinkY - fromLineHeight
                    ),
                    left: goLeft
                      ? lineStartX - sideGap
                      : lineStartX + lineWidth + sideGap,
                    borderLeft: '1px solid #555',
                  }}
                ></div>
                <div
                  className={style.arrow}
                  style={{
                    transformOrigin: 'center bottom',
                    transform: `
                        rotate(${arrowGoLeft ? '60deg' : '-60deg'})`,
                    position: 'absolute',
                    top: arrowPosition.y,
                    left: arrowPosition.x,
                  }}
                ></div>
                <div
                  className={style.link_label}
                  style={{
                    transform: `translate(-50%)`,
                    position: 'absolute',
                    textAlign: goLeft ? 'left' : 'right',
                    top: `${fromLinkLabelPosition.y}px`,
                    left: `${fromLinkLabelPosition.x}px`,
                  }}
                >
                  {linkLabel}
                </div>
                <div
                  className={style.link_label}
                  style={{
                    transform: `translate(-50%)`,
                    position: 'absolute',
                    textAlign: goLeft ? 'left' : 'right',
                    top: `${toLinkLabelPosition.y}px`,
                    left: `${toLinkLabelPosition.x}px`,
                  }}
                >
                  {linkLabel}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default TextArea;
