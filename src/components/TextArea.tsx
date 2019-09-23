import React, { useRef, useEffect, useState } from 'react';
import style from '../styles/TextArea.module.css';
import {
  ISinglePack,
  AnnotationPosition,
  LinkWithPos,
  IAnnotation,
} from '../lib/interfaces';
import {
  applyColorToLegend,
  notNullOrUndefined,
  calcuateLinesLevels,
  calcuateLinkHeight,
  shouldMultiLineGoLeft,
} from '../lib/utils';
import Annotation from './Annotation';
import {
  useTextViewerState,
  attributeId,
} from '../contexts/text-viewer.context';
import { throttle } from 'lodash-es';

export interface TextAreaProp {
  textPack: ISinglePack;
}
export interface TextNodeDimention {
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

  const [textNodeDimention, setTextNodeDimention] = useState<TextNodeDimention>(
    {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }
  );

  const annotaionLegendsWithColor = applyColorToLegend(legends.annotations);
  const {
    selectedLegendIds,
    selectedAnnotationId,
    selectedLegendAttributeIds,
  } = useTextViewerState();

  function calculateAnnotationPositionAndAreaSize(annotations: IAnnotation[]) {
    if (textNodeEl.current && textAreaEl.current) {
      const textNode = textNodeEl.current && textNodeEl.current.childNodes[0];
      const textAreaRect = textAreaEl.current.getBoundingClientRect();
      const textNodeRect = textNodeEl.current.getBoundingClientRect();

      const textAreaDimention = {
        width: textNodeRect.width,
        height: textNodeRect.height,
        x: textNodeRect.left - textAreaRect.left,
        y: textNodeRect.top - textAreaRect.top,
      };

      const annotationBlocks = annotations.map(anno => {
        const range = document.createRange();
        range.setStart(textNode, anno.span.begin);
        range.setEnd(textNode, anno.span.end);
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

      setAnnotationPositions(annotationBlocks);
      setTextNodeDimention(textAreaDimention);
    }
  }

  useEffect(() => {
    const handleWindowResize = throttle(() => {
      calculateAnnotationPositionAndAreaSize(annotations);
    }, 100);

    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [annotations]);

  const annotationWithPosition = (annotationPositions || [])
    .map((position, i) => {
      return {
        position,
        annotation: annotations[i],
      };
    })
    .filter(ann => selectedLegendIds.indexOf(ann.annotation.legendId) > -1);

  let linksWithPos: LinkWithPos[] = links
    .map(link => {
      const fromEntryWithPosition = annotationWithPosition.find(
        ann => ann.annotation.id === link.fromEntryId
      );
      const toEntryWithPosition = annotationWithPosition.find(
        ann => ann.annotation.id === link.toEntryId
      );

      if (fromEntryWithPosition && toEntryWithPosition) {
        const fromEntryX = fromEntryWithPosition.position.rects[0].x;
        const fromEntryY = fromEntryWithPosition.position.rects[0].y;
        const fromEntryWidth = fromEntryWithPosition.position.rects[0].width;

        const toEntryX = toEntryWithPosition.position.rects[0].x;
        const toEntryY = toEntryWithPosition.position.rects[0].y;
        const toEntryWidth = toEntryWithPosition.position.rects[0].width;

        const fromLinkX = fromEntryX + fromEntryWidth / 2;
        const toLinkX = toEntryX + toEntryWidth / 2;

        return {
          link,
          fromEntryWithPos: fromEntryWithPosition,
          toEntryWithPos: toEntryWithPosition,
          fromLinkX,
          toLinkX,
          fromLinkY: fromEntryY,
          toLinkY: toEntryY,
        };
      } else {
        return null;
      }
    })
    .filter(notNullOrUndefined)
    .filter(link => selectedLegendIds.indexOf(link.link.legendId) > -1);

  const lineStartX = textNodeDimention.x;
  const lineWidth = textNodeDimention.width;
  const textLinkDistance = 8;
  const linkGap = 8;
  const borderRadius = 8;

  const linesLevels = calcuateLinesLevels(linksWithPos, lineStartX, lineWidth);
  const linkHeight = calcuateLinkHeight(linesLevels, linkGap);

  return (
    <div className={style.text_area_container} ref={textAreaEl}>
      <div className={style.text_node_container} ref={textNodeEl}>
        {text}
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
              .join(', ');

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
                  {linkPos.link.attributes.rel_type}
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
                  {linkPos.link.attributes.rel_type}
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
