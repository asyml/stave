import React, { useRef, useEffect, useState } from 'react';
import style from '../styles/TextArea.module.css';
import {
  ISinglePack,
  AnnotationPosition, // TODO: rename
  ISpacedAnnotationSpan,
  ITextNodeDimension,
  IRect,
} from '../lib/interfaces';
import {
  applyColorToLegend,
  calcuateLinesLevels,
  calcuateLinkHeight,
} from '../lib/utils';
import {
  spaceOutText,
  mergeLinkWithPosition,
  mergeAnnotationWithPosition,
} from '../lib/text-spacer';
import Annotation from './Annotation';
import LinkSingleLine from './LinkSingleLine';
import LinkMultiLine from './LinkMultiLine';
import AnnotationLabel from './AnnotationLabel';
import LinkEditConnector from './LinkEditConnector';
import {
  useTextViewerState,
  useTextViewerDispatch,
} from '../contexts/text-viewer.context';
import { throttle } from 'lodash-es';
import LineWithArrow from './LineWithArrow';

import { ll } from '../lib/log';

export interface TextAreaProp {
  textPack: ISinglePack;
}

function TextArea({ textPack }: TextAreaProp) {
  const { annotations, legends, text, links } = textPack;
  const textNodeEl = useRef<HTMLDivElement>(null);
  const textAreaEl = useRef<HTMLDivElement>(null);
  const [annotationPositions, setAnnotationPositions] = useState<
    AnnotationPosition[]
  >([]);

  const [textNodeDimension, setTextNodeDimension] = useState<
    ITextNodeDimension
  >({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    clientX: 0,
    clientY: 0,
  });

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
    linkEditToEntryId,
    linkEditIsCreating,
    linkEditIsDragging,

    annoEditIsCreating,
    annoEditCursorBegin,
    annoEditCursorEnd,
  } = useTextViewerState();

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
        const { text, annotationSpanMap, charMoveMap } = spaceOutText(
          textPack,
          selectedLegendIds,
          selectedLegendAttributeIds,
          collpasedLinesIndex
        );

        dispatch({
          type: 'set-spaced-annotation-span',
          spacedAnnotationSpan: annotationSpanMap,
          spacedText: text,
          charMoveMap,
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

  const annotationsWithPosition = mergeAnnotationWithPosition(
    annotationPositions,
    annotations
  ).filter(ann => selectedLegendIds.indexOf(ann.annotation.legendId) > -1);

  const linksWithPos = mergeLinkWithPosition(
    links,
    annotationsWithPosition
  ).filter(link => selectedLegendIds.indexOf(link.link.legendId) > -1);

  const lineStartX = textNodeDimension.x;
  const lineWidth = textNodeDimension.width;
  const linkGap = 8;

  const linesLevels = calcuateLinesLevels(linksWithPos, lineStartX, lineWidth);
  const linkHeight = calcuateLinkHeight(linesLevels, linkGap);
  const lineHeights = Object.keys(linesLevels).map(l => +l);

  const textAreaClass = `${style.text_area_container} ${
    spacedText ? style.text_area_container_visible : ''
  }`;

  function renderLineWithArrow() {
    if (
      linkEditIsCreating &&
      !linkEditIsDragging &&
      linkEditFromEntryId &&
      linkEditToEntryId
    ) {
      const startAnnotaion = annotationsWithPosition.find(
        link => link.annotation.id === linkEditFromEntryId
      );

      const endAnnotaion = annotationsWithPosition.find(
        link => link.annotation.id === linkEditToEntryId
      );

      if (!startAnnotaion || !endAnnotaion) return null;

      const fromPos = {
        x:
          startAnnotaion.position.rects[0].x +
          startAnnotaion.position.rects[0].width,
        y: startAnnotaion.position.rects[0].y,
      };

      const toPos = {
        x:
          endAnnotaion.position.rects[0].x +
          endAnnotaion.position.rects[0].width / 2,
        y: endAnnotaion.position.rects[0].y,
      };

      return (
        <div className={style.link_edit_container}>
          <LineWithArrow fromPos={fromPos} toPos={toPos} />
        </div>
      );
    } else {
      return null;
    }
  }

  useEffect(() => {
    function handleTextMouseUp(e: MouseEvent) {
      if (annoEditIsCreating) {
        const selection = window.getSelection();

        if (selection) {
          if (selection.type === 'Range') {
            const begin = Math.min(
              selection.anchorOffset,
              selection.focusOffset
            );
            const end = Math.max(selection.anchorOffset, selection.focusOffset);
            dispatch({
              type: 'annotation-edit-select-text',
              begin,
              end,
            });
            selection.empty();
          } else if (
            selection.type === 'Caret' &&
            e.target === textAreaEl.current
          ) {
            if (annoEditCursorBegin === null) {
              dispatch({
                type: 'annotation-edit-set-begin',
                begin: selection.anchorOffset,
              });
            } else {
              dispatch({
                type: 'annotation-edit-set-end',
                end: selection.anchorOffset,
              });
            }
          }
        }
      }
    }

    window.addEventListener('mouseup', handleTextMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleTextMouseUp);
    };
  }, [dispatch, annoEditIsCreating, annoEditCursorBegin, textAreaEl]);

  let annoEditRangeRects: IRect[] = [];
  let annoEditBeginRect: IRect | null = null;
  let annoEditEndRect: IRect | null = null;
  if (
    annoEditCursorBegin !== null &&
    textNodeEl.current &&
    textAreaEl.current
  ) {
    const selectionIndicators = getTextSelectionIndicators(
      annoEditCursorBegin,
      annoEditCursorEnd,
      textNodeEl.current,
      textAreaEl.current
    );

    annoEditRangeRects = selectionIndicators.rangeRects;
    annoEditBeginRect = selectionIndicators.beginRect;
    annoEditEndRect = selectionIndicators.endRect;

    // const textNode = textNodeEl.current && textNodeEl.current.childNodes[0];
    // const textAreaRect = textAreaEl.current.getBoundingClientRect();

    // const range = document.createRange();

    // range.setStart(textNode, annoEditCursorBegin);
    // range.setEnd(textNode, annoEditCursorEnd);
    // const rects = Array.from(range.getClientRects() as DOMRectList);
    // annoEditTextSelectionRect = rects.map(rect => ({
    //   x: rect.x - textAreaRect.left,
    //   y: rect.y - textAreaRect.top,
    //   width: rect.width,
    //   height: rect.height,
    // }));
  }

  return (
    <div
      className={textAreaClass}
      style={{
        userSelect: linkEditIsCreating ? 'none' : 'auto',
        cursor: annoEditIsCreating ? 'text' : 'initial',
      }}
      ref={textAreaEl}
    >
      <div className={style.text_node_container} ref={textNodeEl}>
        {spacedText || text}
      </div>

      <div
        style={{
          pointerEvents: annoEditIsCreating ? 'none' : 'initial',
        }}
      >
        {annotationsWithPosition.map((ann, i) => {
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

      <div className="ann_edit_rects_container">
        {annoEditRangeRects.map((rect, i) => {
          return (
            <div
              key={i}
              className={style.ann_edit_rect}
              style={{
                transform: `translate(${rect.x}px,${rect.y}px)`,
                pointerEvents: 'none',
                background: '#555',
                opacity: 0.3,
                height: rect.height,
                width: rect.width,
              }}
            ></div>
          );
        })}

        {annoEditBeginRect && (
          <div
            className={style.annotation_text_selection_cursor}
            style={{
              transform: `translate(${annoEditBeginRect.x}px,${annoEditBeginRect.y}px)`,
              pointerEvents: 'none',
              height: annoEditBeginRect.height,
              width: annoEditBeginRect.width,
            }}
          >
            <span className={style.cursor}></span>
          </div>
        )}
        {annoEditEndRect && (
          <div
            className={style.annotation_text_selection_cursor}
            style={{
              transform: `translate(${annoEditEndRect.x}px,${annoEditEndRect.y}px)`,
              pointerEvents: 'none',
              height: annoEditEndRect.height,
              width: annoEditEndRect.width,
            }}
          >
            <span className={style.cursor}></span>
          </div>
        )}
      </div>

      <div
        className="annotation_line_toggles_container"
        style={{
          pointerEvents: annoEditIsCreating ? 'none' : 'initial',
        }}
      >
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

      <div
        className="annotation_label_container"
        style={{
          pointerEvents: annoEditIsCreating ? 'none' : 'initial',
        }}
      >
        {annotationsWithPosition.map(ann => {
          const isSelected = ann.annotation.id === selectedAnnotationId;

          return (
            <AnnotationLabel
              key={ann.annotation.id}
              annotationWithPosition={ann}
              isSelected={isSelected}
              selectedLegendAttributeIds={selectedLegendAttributeIds}
            />
          );
        })}
      </div>

      <div
        className="links_container"
        style={{
          pointerEvents: annoEditIsCreating ? 'none' : 'initial',
        }}
      >
        {linksWithPos.map(linkPos => {
          const isLinkSelected = selectedLinkId === linkPos.link.id;
          const isLinkHightlighted =
            highlightedLinkIds.includes(linkPos.link.id) ||
            halfSelectedLinkIds.includes(linkPos.link.id);

          if (linkPos.fromLinkY === linkPos.toLinkY) {
            const lineIndex = lineHeights.indexOf(linkPos.fromLinkY);
            const isLineCollapsed =
              collpasedLineIndexes.indexOf(lineIndex) !== -1;

            return (
              <LinkSingleLine
                key={linkPos.link.id}
                linkWithPosition={linkPos}
                isSelected={isLinkSelected}
                isHightlighted={isLinkHightlighted}
                isCollapsed={isLineCollapsed}
                linkHeight={linkHeight}
                selectedLegendAttributeIds={selectedLegendAttributeIds}
              />
            );
          } else {
            return (
              <LinkMultiLine
                key={linkPos.link.id}
                linkWithPosition={linkPos}
                isSelected={isLinkSelected}
                isHightlighted={isLinkHightlighted}
                linkHeight={linkHeight}
                selectedLegendAttributeIds={selectedLegendAttributeIds}
                collpasedLineIndexes={collpasedLineIndexes}
                lineHeights={lineHeights}
                lineStartX={lineStartX}
                lineWidth={lineWidth}
              />
            );
          }
        })}
      </div>

      {linkEditIsDragging && (
        <div className={style.link_edit_container}>
          <LinkEditConnector
            annotationsWithPosition={annotationsWithPosition}
            fromEntryId={linkEditFromEntryId}
            textNodeDimension={textNodeDimension}
          />
        </div>
      )}

      {renderLineWithArrow()}
    </div>
  );
}

function getTextSelectionIndicators(
  begin: number,
  end: number | null,
  textNodeEl: HTMLDivElement,
  textAreaEl: HTMLDivElement
): {
  rangeRects: IRect[];
  beginRect: IRect;
  endRect: IRect | null;
} {
  if (end !== null) {
    const textNode = textNodeEl && textNodeEl.childNodes[0];
    const textAreaRect = textAreaEl.getBoundingClientRect();

    const range = document.createRange();
    const beginRange = document.createRange();
    const endRange = document.createRange();

    range.setStart(textNode, begin);
    range.setEnd(textNode, end);
    const rects = Array.from(range.getClientRects() as DOMRectList);
    const annoEditTextSelectionRect = rects.map(rect => ({
      x: rect.x - textAreaRect.left,
      y: rect.y - textAreaRect.top,
      width: rect.width,
      height: rect.height,
    }));

    beginRange.setStart(textNode, begin);
    beginRange.setEnd(textNode, begin);
    const beginRect = Array.from(beginRange.getClientRects() as DOMRectList)[0];

    endRange.setStart(textNode, end);
    endRange.setEnd(textNode, end);
    const endRect = Array.from(endRange.getClientRects() as DOMRectList)[0];

    return {
      rangeRects: annoEditTextSelectionRect,
      beginRect: {
        x: beginRect.x - textAreaRect.left,
        y: beginRect.y - textAreaRect.top,
        width: beginRect.width,
        height: beginRect.height,
      },
      endRect: {
        x: endRect.x - textAreaRect.left,
        y: endRect.y - textAreaRect.top,
        width: endRect.width,
        height: endRect.height,
      },
    };
  } else {
    const textNode = textNodeEl && textNodeEl.childNodes[0];
    const textAreaRect = textAreaEl.getBoundingClientRect();

    const beginRange = document.createRange();

    beginRange.setStart(textNode, begin);
    beginRange.setEnd(textNode, begin);
    const beginRect = Array.from(beginRange.getClientRects() as DOMRectList)[0];

    return {
      rangeRects: [],
      beginRect: {
        x: beginRect.x - textAreaRect.left,
        y: beginRect.y - textAreaRect.top,
        width: beginRect.width,
        height: beginRect.height,
      },
      endRect: null,
    };
  }
}

export default TextArea;
