import React, { useRef, useEffect, useState } from 'react';
import style from '../styles/TextArea.module.css';
import {
  ISinglePack,
  AnnotationPosition,
  ISpacedAnnotationSpan,
  IAnnotation,
  IPos,
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
  clientX: number;
  clientY: number;
}

const lineMaskWidth = 8;
const lineMaskColor = 'none';

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
      clientX: 0,
      clientY: 0,
    }
  );

  const annotaionLegendsWithColor = applyColorToLegend(legends.annotations);

  const dispatch = useTextViewerDispatch();
  const {
    selectedLegendIds,
    selectedLegendAttributeIds,

    spacingCalcuated,
    spacedAnnotationSpan,
    spacedText,
    collpasedLineIndexes,

    selectedAnnotationId,
    highlightedAnnotationIds,
    halfSelectedAnnotationIds,

    selectedLinkId,
    highlightedLinkIds,
    halfSelectedLinkIds,

    linkEditFromEntryId,
    linkEditIsCreating,
    linkEditMovePosition,
  } = useTextViewerState();

  useEffect(() => {
    function updatePos(e: MouseEvent) {
      requestAnimationFrame(() => {
        dispatch({
          type: 'update-move-pos',
          pos: { x: e.clientX, y: e.clientY },
        });
      });
    }
    function endMove() {
      dispatch({
        type: 'end-create-link',
      });
    }

    if (linkEditIsCreating) {
      window.addEventListener('mousemove', updatePos);
      window.addEventListener('mouseup', endMove);
    }

    return () => {
      if (linkEditIsCreating) {
        window.removeEventListener('mousemove', updatePos);
        window.removeEventListener('mouseup', endMove);
      }
    };
  }, [linkEditIsCreating, dispatch]);

  useEffect(() => {
    function calculateTextSpace(
      textPack: ISinglePack,
      selectedLegendIds: string[],
      selectedLegendAttributeIds: string[],
      spacingCalcuated: boolean,
      spacedAnnotationSpan: ISpacedAnnotationSpan,
      collpasedLinesIndex: number[]
    ) {
      if (!spacingCalcuated) {
        const { text, annotationSpanMap } = spaceOutText(
          textPack,
          selectedLegendIds,
          selectedLegendAttributeIds,
          collpasedLinesIndex
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
          clientX: textAreaRect.left,
          clientY: textAreaRect.top,
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
      spacedAnnotationSpan,
      collpasedLineIndexes
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
    collpasedLineIndexes,
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
  const lineHeights = Object.keys(linesLevels).map(l => +l);

  const textAreaClass = `${style.text_area_container} ${
    spacedText ? style.text_area_container_visible : ''
  }`;

  return (
    <div
      className={textAreaClass}
      style={{
        userSelect: linkEditIsCreating ? 'none' : 'auto',
      }}
      ref={textAreaEl}
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
              isHighlighted={
                highlightedAnnotationIds.indexOf(ann.annotation.id) > -1 ||
                halfSelectedAnnotationIds.indexOf(ann.annotation.id) > -1
              }
              legend={legend}
              position={ann.position}
            />
          );
        })}
      </div>

      <div className="annotation_line_toggles_container">
        {lineHeights.map((lineHeight, i) => {
          function collapse() {
            dispatch({
              type: 'collapse-line',
              lineIndex: i,
            });
          }
          function uncollapse() {
            dispatch({
              type: 'uncollapse-line',
              lineIndex: i,
            });
          }
          const isCollpased = collpasedLineIndexes.indexOf(i) > -1;
          return (
            <button
              key={i}
              onClick={isCollpased ? uncollapse : collapse}
              className={style.annotation_line_toggle}
              style={{ top: lineHeight }}
            >
              {isCollpased ? '+' : '-'}
            </button>
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
              if (isSelected) {
                return true;
              } else {
                return (
                  selectedLegendAttributeIds.indexOf(
                    attributeId(ann.annotation.legendId, attrKey)
                  ) > -1
                );
              }
            }
          );

          return (
            <div
              key={ann.annotation.id}
              className={
                isSelected ? style.annotation_attr_container_selected : ''
              }
              style={{
                position: 'absolute',
                zIndex: isSelected ? 10 : 0,
                transform: `translate(-50%, 0)`,
                top: ann.position.rects[0].y + 20,
                left: ann.position.rects[0].x + ann.position.rects[0].width / 2,
                fontSize: 10,
                backgroundColor: 'white',
              }}
            >
              {ann.position.rects.map((rect, i) => {
                return attrKeys.map((attrKey, j) => {
                  return (
                    <div
                      className={
                        isSelected
                          ? style.annotation_attr_rect_selected
                          : style.annotation_attr_rect
                      }
                      key={attrKey + i}
                      style={{
                        ...(!isSelected && {
                          top: j * 2,
                          left: j * 2,
                        }),
                      }}
                    >
                      {isSelected ? (
                        <>
                          <span className={style.annotation_attr_label}>
                            {attrKey}
                          </span>
                          <span className={style.annotation_attr_value}>
                            {ann.annotation.attributes[attrKey]}
                          </span>
                        </>
                      ) : (
                        ann.annotation.attributes[attrKey]
                          .substring(0, 3)
                          .toUpperCase()
                      )}
                    </div>
                  );
                });
              })}
            </div>
          );
        })}
      </div>

      <div className="links_container">
        {linksWithPos.map(linkPos => {
          const isLinkSelected = selectedLinkId === linkPos.link.id;
          const isLinkHightlighted =
            highlightedLinkIds.includes(linkPos.link.id) ||
            halfSelectedLinkIds.includes(linkPos.link.id);
          const borderWidth = '1px';
          const borderColor =
            isLinkSelected || isLinkHightlighted ? '#555' : '#bbb';
          const zIndex = isLinkSelected || isLinkHightlighted ? 1 : 0;

          if (linkPos.fromLinkY === linkPos.toLinkY) {
            const lineIndex = lineHeights.indexOf(linkPos.fromLinkY);
            const lineCollapsed =
              collpasedLineIndexes.indexOf(lineIndex) !== -1;
            const height = lineCollapsed
              ? textLinkDistance
              : textLinkDistance +
                linkHeight[linkPos.link.id][linkPos.fromLinkY];

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
                  className={style.link_line}
                  style={{
                    height: height,
                    width: Math.abs(linkPos.fromLinkX - linkPos.toLinkX),
                    position: 'absolute',
                    top: linkPos.fromLinkY - height,
                    left: Math.min(linkPos.fromLinkX, linkPos.toLinkX),
                    border: '1px solid #aaa',
                    borderTopWidth: borderWidth,
                    borderLeftWidth: borderWidth,
                    borderRightWidth: borderWidth,
                    borderColor: borderColor,
                    borderTopLeftRadius: borderRadius,
                    borderTopRightRadius: borderRadius,
                    borderBottomWidth: '0px',
                    zIndex,
                  }}
                ></div>
                <div
                  onClick={() =>
                    dispatch({ type: 'select-link', linkId: linkPos.link.id })
                  }
                  onMouseEnter={() => {
                    dispatch({
                      type: 'highlight-link',
                      linkId: linkPos.link.id,
                    });
                  }}
                  onMouseLeave={() => {
                    dispatch({ type: 'unhighlight-link' });
                  }}
                  style={{
                    position: 'absolute',
                    width: Math.abs(linkPos.fromLinkX - linkPos.toLinkX),
                    height: lineMaskWidth,
                    background: lineMaskColor,
                    top: linkPos.fromLinkY - height - lineMaskWidth / 2,
                    left: Math.min(linkPos.fromLinkX, linkPos.toLinkX),
                  }}
                  className={style.link_event_mask}
                ></div>
                <div
                  onClick={() =>
                    dispatch({ type: 'select-link', linkId: linkPos.link.id })
                  }
                  onMouseEnter={() => {
                    dispatch({
                      type: 'highlight-link',
                      linkId: linkPos.link.id,
                    });
                  }}
                  onMouseLeave={() => {
                    dispatch({ type: 'unhighlight-link' });
                  }}
                  style={{
                    position: 'absolute',
                    width: lineMaskWidth,
                    background: lineMaskColor,
                    height: height,
                    top: linkPos.fromLinkY - height,
                    left:
                      Math.min(linkPos.fromLinkX, linkPos.toLinkX) -
                      lineMaskWidth / 2,
                  }}
                  className={style.link_event_mask}
                ></div>
                <div
                  onClick={() =>
                    dispatch({ type: 'select-link', linkId: linkPos.link.id })
                  }
                  onMouseEnter={() => {
                    dispatch({
                      type: 'highlight-link',
                      linkId: linkPos.link.id,
                    });
                  }}
                  onMouseLeave={() => {
                    dispatch({ type: 'unhighlight-link' });
                  }}
                  style={{
                    position: 'absolute',
                    width: lineMaskWidth,
                    background: lineMaskColor,
                    height: height,
                    top: linkPos.fromLinkY - height,
                    left:
                      Math.min(linkPos.fromLinkX, linkPos.toLinkX) +
                      Math.abs(linkPos.fromLinkX - linkPos.toLinkX) -
                      lineMaskWidth / 2,
                  }}
                  className={style.link_event_mask}
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
                    borderTopColor: borderColor,
                  }}
                ></div>
                {linkLabel && !lineCollapsed ? (
                  <div
                    className={style.link_label}
                    style={{
                      transform: `translate(-50%)`,
                      position: 'absolute',
                      textAlign: goLeft ? 'left' : 'right',
                      top: `${linkLabelPosition.y}px`,
                      left: `${linkLabelPosition.x}px`,
                      color:
                        isLinkSelected || isLinkHightlighted ? '#555' : '#999',
                    }}
                  >
                    {linkLabel}
                  </div>
                ) : null}
              </div>
            );
          } else {
            const fromLineIndex = lineHeights.indexOf(linkPos.fromLinkY);
            const fromLineCollapsed =
              collpasedLineIndexes.indexOf(fromLineIndex) !== -1;
            const fromLineHeight = fromLineCollapsed
              ? textLinkDistance
              : textLinkDistance +
                linkHeight[linkPos.link.id][linkPos.fromLinkY];

            const toLineIndex = lineHeights.indexOf(linkPos.toLinkY);
            const toLineCollapsed =
              collpasedLineIndexes.indexOf(toLineIndex) !== -1;
            const toLineHeight = toLineCollapsed
              ? textLinkDistance
              : textLinkDistance + linkHeight[linkPos.link.id][linkPos.toLinkY];

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
            const fromLineWidth = goLeft
              ? Math.abs(linkPos.fromLinkX - lineStartX) + sideGap
              : Math.abs(linkPos.fromLinkX - (lineStartX + lineWidth)) +
                sideGap;

            const toLineX = goLeft
              ? Math.min(linkPos.toLinkX, lineStartX) - sideGap
              : Math.min(linkPos.toLinkX, lineStartX + lineWidth);
            const toLineWidth = goLeft
              ? Math.abs(linkPos.toLinkX - lineStartX) + sideGap
              : Math.abs(linkPos.toLinkX - (lineStartX + lineWidth)) + sideGap;

            const fromLinkLabelPosition = {
              x: fromLineX + fromLineWidth / 2,
              y: linkPos.fromLinkY - fromLineHeight - 4,
            };

            const toLinkLabelPosition = {
              x: toLineX + toLineWidth / 2,
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
                  className={style.link_line}
                  style={{
                    height: fromLineHeight,
                    width: fromLineWidth,
                    position: 'absolute',
                    top: linkPos.fromLinkY - fromLineHeight,
                    left: fromLineX,
                    border: '1px solid #aaa',
                    borderColor: borderColor,
                    borderTopLeftRadius: goLeft ? 0 : borderRadius,
                    borderTopRightRadius: goLeft ? borderRadius : 0,
                    borderBottomWidth: 0,
                    borderTopWidth: borderWidth,
                    borderLeftWidth: goLeft ? 0 : borderWidth,
                    borderRightWidth: goLeft ? borderWidth : 0,
                    zIndex,
                  }}
                ></div>
                <div
                  className={style.link_line}
                  style={{
                    height: toLineHeight,
                    width: toLineWidth,
                    position: 'absolute',
                    top: linkPos.toLinkY - toLineHeight,
                    left: toLineX,
                    border: '1px solid #aaa',
                    borderColor: borderColor,
                    borderTopLeftRadius: goLeft ? 0 : borderRadius,
                    borderTopRightRadius: goLeft ? borderRadius : 0,
                    borderBottomWidth: 0,
                    borderTopWidth: borderWidth,
                    borderLeftWidth: goLeft ? 0 : borderWidth,
                    borderRightWidth: goLeft ? borderWidth : 0,
                    zIndex,
                  }}
                ></div>

                <div
                  className={style.link_line}
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
                    borderLeft: '1px solid #aaa',
                    borderLeftWidth: borderWidth,
                    borderColor: borderColor,
                    zIndex,
                  }}
                ></div>

                <div
                  onClick={() =>
                    dispatch({ type: 'select-link', linkId: linkPos.link.id })
                  }
                  onMouseEnter={() => {
                    dispatch({
                      type: 'highlight-link',
                      linkId: linkPos.link.id,
                    });
                  }}
                  onMouseLeave={() => {
                    dispatch({ type: 'unhighlight-link' });
                  }}
                  style={{
                    position: 'absolute',
                    width: fromLineWidth,
                    height: lineMaskWidth,
                    background: lineMaskColor,
                    top: linkPos.fromLinkY - fromLineHeight - lineMaskWidth / 2,
                    left: fromLineX,
                  }}
                  className={style.link_event_mask}
                ></div>

                <div
                  onClick={() =>
                    dispatch({ type: 'select-link', linkId: linkPos.link.id })
                  }
                  onMouseEnter={() => {
                    dispatch({
                      type: 'highlight-link',
                      linkId: linkPos.link.id,
                    });
                  }}
                  onMouseLeave={() => {
                    dispatch({ type: 'unhighlight-link' });
                  }}
                  style={{
                    position: 'absolute',
                    width: toLineWidth,
                    height: lineMaskWidth,
                    background: lineMaskColor,
                    top: linkPos.toLinkY - toLineHeight - lineMaskWidth / 2,
                    left: toLineX,
                  }}
                  className={style.link_event_mask}
                ></div>

                <div
                  onClick={() =>
                    dispatch({ type: 'select-link', linkId: linkPos.link.id })
                  }
                  onMouseEnter={() => {
                    dispatch({
                      type: 'highlight-link',
                      linkId: linkPos.link.id,
                    });
                  }}
                  onMouseLeave={() => {
                    dispatch({ type: 'unhighlight-link' });
                  }}
                  style={{
                    position: 'absolute',
                    width: lineMaskWidth,
                    background: lineMaskColor,
                    height: fromLineHeight,
                    top: linkPos.fromLinkY - fromLineHeight,
                    left:
                      fromLineX -
                      lineMaskWidth / 2 +
                      (goLeft ? fromLineWidth : 0),
                  }}
                  className={style.link_event_mask}
                ></div>

                <div
                  onClick={() =>
                    dispatch({ type: 'select-link', linkId: linkPos.link.id })
                  }
                  onMouseEnter={() => {
                    dispatch({
                      type: 'highlight-link',
                      linkId: linkPos.link.id,
                    });
                  }}
                  onMouseLeave={() => {
                    dispatch({ type: 'unhighlight-link' });
                  }}
                  style={{
                    position: 'absolute',
                    width: lineMaskWidth,
                    background: lineMaskColor,
                    height: toLineHeight,
                    top: linkPos.toLinkY - toLineHeight,
                    left:
                      toLineX - lineMaskWidth / 2 + (goLeft ? toLineWidth : 0),
                  }}
                  className={style.link_event_mask}
                ></div>

                <div
                  onClick={() =>
                    dispatch({ type: 'select-link', linkId: linkPos.link.id })
                  }
                  onMouseEnter={() => {
                    dispatch({
                      type: 'highlight-link',
                      linkId: linkPos.link.id,
                    });
                  }}
                  onMouseLeave={() => {
                    dispatch({ type: 'unhighlight-link' });
                  }}
                  style={{
                    height:
                      Math.abs(
                        linkPos.toLinkY -
                          toLineHeight -
                          (linkPos.fromLinkY - fromLineHeight)
                      ) + 1,
                    width: lineMaskWidth,
                    background: lineMaskColor,
                    position: 'absolute',
                    top: Math.min(
                      linkPos.toLinkY - toLineHeight,
                      linkPos.fromLinkY - fromLineHeight
                    ),
                    left: goLeft
                      ? lineStartX - sideGap
                      : lineStartX + lineWidth + sideGap - lineMaskWidth / 2,
                  }}
                  className={style.link_event_mask}
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
                {fromLineCollapsed ? null : (
                  <div
                    className={style.link_label}
                    style={{
                      transform: `translate(-50%)`,
                      position: 'absolute',
                      textAlign: goLeft ? 'left' : 'right',
                      top: `${fromLinkLabelPosition.y}px`,
                      left: `${fromLinkLabelPosition.x}px`,
                      color:
                        isLinkSelected || isLinkHightlighted ? '#555' : '#999',
                    }}
                  >
                    {linkLabel}
                  </div>
                )}
                {toLineCollapsed ? null : (
                  <div
                    className={style.link_label}
                    style={{
                      transform: `translate(-50%)`,
                      position: 'absolute',
                      textAlign: goLeft ? 'left' : 'right',
                      top: `${toLinkLabelPosition.y}px`,
                      left: `${toLinkLabelPosition.x}px`,
                      color:
                        isLinkSelected || isLinkHightlighted ? '#555' : '#999',
                    }}
                  >
                    {linkLabel}
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>

      <div
        className="link_edit_container"
        style={{
          display: linkEditIsCreating ? 'block' : 'none',
        }}
      >
        {linkEditConnector(
          annotationWithPosition,
          linkEditFromEntryId,
          linkEditMovePosition,
          textNodeDimension
        )}
      </div>
    </div>
  );
}

function linkEditConnector(
  annotationWithPosition: {
    position: AnnotationPosition;
    annotation: IAnnotation;
  }[],
  fromEntryId: string | null,
  movePos: IPos,
  textNodeDimension: TextNodeDimension
) {
  const startAnnotaion = annotationWithPosition.find(
    link => link.annotation.id === fromEntryId
  );
  const isMoved = movePos.x !== 0 || movePos.y !== 0;
  if (!startAnnotaion || !fromEntryId || !isMoved) return null;

  let x =
    startAnnotaion.position.rects[0].x + startAnnotaion.position.rects[0].width;
  let y = startAnnotaion.position.rects[0].y;

  let width = movePos.x - x - textNodeDimension.clientX;
  let height = movePos.y - y - textNodeDimension.clientY;

  let rotate = (Math.atan(height / width) * 180) / Math.PI;
  if (width === 0) {
    if (height > 0) {
      rotate = -90;
    } else {
      rotate = 90;
    }
  } else if (width < 0) {
    if (height > 0) {
      rotate += 180;
    } else {
      rotate -= 180;
    }
  }

  return (
    <div
      className={style.link_edit_connector}
      style={{
        position: 'absolute',
        top: y,
        left: x,
        transformOrigin: `0 0`,
        transform: `rotate(${rotate}deg)`,
        width: Math.sqrt(width * width + height * height) - 2,
        height: 1,
      }}
    ></div>
  );
}

export default TextArea;
