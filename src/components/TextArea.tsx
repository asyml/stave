import React, { useRef, useEffect, useState } from 'react';
import style from '../styles/TextArea.module.css';
import {
  ISinglePack,
  AnnotationPosition,
  LinkWithPos,
} from '../lib/interfaces';
import {
  applyColorToLegend,
  notNullOrUndefined,
  calcuateLinesLevels,
  calcuateLinkHeight,
  shouldMultiLineGoLeft,
} from '../lib/utils';
import Annotation from './Annotation';
import { useTextViewerState } from '../contexts/text-viewer.context';

export interface TextAreaProp {
  textPack: ISinglePack;
}
export interface TextAreaDimention {
  width: number;
  height: number;
  x: number;
  y: number;
}

function TextArea({ textPack }: TextAreaProp) {
  const { annotations, legends, text, links } = textPack;
  const inputEl = useRef<HTMLDivElement>(null);
  const [annotationPositions, setAnnotationPositions] = useState<
    AnnotationPosition[]
  >([]);

  const [textAreaDimention, setTextAreaDimention] = useState<TextAreaDimention>(
    {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    }
  );

  const legendsWithColor = applyColorToLegend(legends);
  const contextState = useTextViewerState();

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

  useEffect(() => {
    if (inputEl.current && inputEl.current) {
      const rect = inputEl.current.getBoundingClientRect();
      setTextAreaDimention({
        width: rect.width,
        height: rect.height,
        x: rect.left,
        y: rect.top,
      });
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
    .filter(notNullOrUndefined);

  const lineStartX = textAreaDimention.x;
  const lineWidth = textAreaDimention.width;
  const textLinkDistance = 5;
  const borderRadius = 8;
  const linkGap = 5;

  const linesLevels = calcuateLinesLevels(linksWithPos, lineStartX, lineWidth);
  const linkHeight = calcuateLinkHeight(linesLevels, linkGap);

  return (
    <div className={style.text_area_container}>
      <div className={style.text_node_container} ref={inputEl}>
        {text}
      </div>

      <div className={style.annotation_container}>
        {annotationWithPosition
          .filter(
            ann =>
              contextState.selectedLegendIds.indexOf(ann.annotation.legendId) >
              -1
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
                  ann.annotation.id === contextState.selectedAnnotationId
                }
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

            return (
              <div key={linkPos.link.id}>
                <div
                  data-from-id={linkPos.link.fromEntryId}
                  data-to-id={linkPos.link.toEntryId}
                  style={{
                    height: height,
                    width: Math.abs(linkPos.fromLinkX - linkPos.toLinkX),
                    transform: `translate(${Math.min(
                      linkPos.fromLinkX,
                      linkPos.toLinkX
                    )}px,${linkPos.fromLinkY - height}px)`,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    border: '1px solid #555',
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                    borderBottom: 0,
                  }}
                ></div>
                <div
                  className={style.arrow}
                  style={{
                    transformOrigin: 'center bottom',
                    transform: `
                        translate(
                            ${arrowPosition.x}px,
                            ${arrowPosition.y}px)
                        rotate(
                            ${goLeft ? '60deg' : '-60deg'})`,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                ></div>
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
                ? linkPos.toLinkX + arrowRadiusAdjust
                : linkPos.toLinkX - 4 - arrowRadiusAdjust,
              y: linkPos.toLinkY - toLineHeight - 2,
            };

            return (
              <div
                key={linkPos.link.id}
                data-from-id={linkPos.link.fromEntryId}
                data-to-id={linkPos.link.toEntryId}
              >
                <div
                  style={{
                    height: fromLineHeight,
                    width: goLeft
                      ? Math.abs(linkPos.fromLinkX - lineStartX) + sideGap
                      : Math.abs(linkPos.fromLinkX - (lineStartX + lineWidth)) +
                        sideGap,
                    transform: `translate(${
                      goLeft
                        ? Math.min(linkPos.fromLinkX, lineStartX) - sideGap
                        : Math.min(linkPos.fromLinkX, lineStartX + lineWidth)
                    }px,${linkPos.fromLinkY - fromLineHeight}px)`,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    border: '1px solid #555',
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
                    width: goLeft
                      ? Math.abs(linkPos.toLinkX - lineStartX) + sideGap
                      : Math.abs(linkPos.toLinkX - (lineStartX + lineWidth)) +
                        sideGap,
                    transform: `translate(${
                      goLeft
                        ? Math.min(linkPos.toLinkX, lineStartX) - sideGap
                        : Math.min(linkPos.toLinkX, lineStartX + lineWidth)
                    }px,${linkPos.toLinkY - toLineHeight}px)`,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    border: '1px solid #555',
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
                    transform: `translate(${
                      goLeft
                        ? lineStartX - sideGap
                        : lineStartX + lineWidth + sideGap
                    }px,${Math.min(
                      linkPos.toLinkY - toLineHeight,
                      linkPos.fromLinkY - fromLineHeight
                    )}px)`,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderLeft: '1px solid #555',
                  }}
                ></div>

                <div
                  className={style.arrow}
                  style={{
                    transformOrigin: 'center bottom',
                    transform: `
                        translate(
                            ${arrowPosition.x}px,
                            ${arrowPosition.y}px)
                        rotate(
                            ${arrowGoLeft ? '60deg' : '-60deg'})`,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                ></div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default TextArea;
