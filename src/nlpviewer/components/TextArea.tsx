import React, { useRef, useEffect, useMemo } from 'react';
import style from '../styles/TextArea.module.css';
import {
  ISinglePack,
  IRect,
  IColoredLegend,
  IAnnotationPosition,
  IAnnotation,
  ILink,
} from '../lib/interfaces';
import { calcuateLinesLevels, calcuateLinkHeight } from '../lib/utils';
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
import { debounce } from 'lodash-es';
import LineWithArrow from './LineWithArrow';

export interface TextAreaProp {
  textPack: ISinglePack;
  annotationLegendsColored: IColoredLegend[];
}

function TextArea({ textPack, annotationLegendsColored }: TextAreaProp) {
  const { annotations, text, links } = textPack;
  const textNodeEl = useRef<HTMLDivElement>(null);
  const textAreaEl = useRef<HTMLDivElement>(null);

  const dispatch = useTextViewerDispatch();
  const {
    selectedLegendIds,
    selectedLegendAttributeIds,

    spacingCalcuated,
    spacedText,
    collpasedLineIndexes,
    annotationPositions,
    textNodeWidth,

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

    jumpToAnnotation,

    selectedScopeId,
    selectedScopeIndex,
  } = useTextViewerState();

  useEffect(() => {
    function calculateTextSpace(
      annotations: IAnnotation[],
      text: string,
      links: ILink[],
      selectedLegendIds: string[],
      selectedLegendAttributeIds: string[],
      spacingCalcuated: boolean,
      collpasedLinesIndex: number[]
    ) {
      if (!spacingCalcuated) {
        const {
          spacedText,
          charMoveMap,
          annotationPositions,
          textNodeWidth,
        } = spaceOutText(
          annotations,
          text,
          links,
          selectedLegendIds,
          selectedLegendAttributeIds,
          collpasedLinesIndex
        );

        dispatch({
          type: 'set-spaced-annotation-span',
          spacedText,
          charMoveMap,
          annotationPositions,
          textNodeWidth,
        });
      }
    }

    const handleWindowResize = debounce(() => {
      dispatch({
        type: 'reset-calculated-text-space',
      });
    }, 500);

    calculateTextSpace(
      annotations,
      text,
      links,
      selectedLegendIds,
      selectedLegendAttributeIds,
      spacingCalcuated,
      collpasedLineIndexes
    );

    if (spacingCalcuated && jumpToAnnotation !== null) {
      const el = document.querySelector(
        `[data-annotaion-id="${jumpToAnnotation}"]`
      );

      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      dispatch({
        type: 'jump-to-annotation-done',
      });
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [
    annotations,
    text,
    links,
    selectedLegendIds,
    selectedLegendAttributeIds,
    spacingCalcuated,
    dispatch,
    collpasedLineIndexes,
    jumpToAnnotation,
  ]);

  const annotationsWithPosition = useMemo(() => {
    return mergeAnnotationWithPosition(annotationPositions, annotations).filter(
      ann => selectedLegendIds.indexOf(ann.annotation.legendId) > -1
    );
  }, [annotationPositions, annotations, selectedLegendIds]);

  const linksWithPos = useMemo(() => {
    return mergeLinkWithPosition(links, annotationsWithPosition).filter(
      link => selectedLegendIds.indexOf(link.link.legendId) > -1
    );
  }, [links, annotationsWithPosition, selectedLegendIds]);

  const lineStartX = 0; // textNodeDimension.x;
  const lineWidth = textNodeWidth; // textNodeDimension.width;
  const linkGap = 8;

  const linesLevels = useMemo(() => {
    return calcuateLinesLevels(linksWithPos, lineStartX, lineWidth);
  }, [linksWithPos, lineStartX, lineWidth]);

  const linkHeight = useMemo(() => {
    return calcuateLinkHeight(linesLevels, linkGap);
  }, [linesLevels, linkGap]);

  const lineHeights = Object.keys(linesLevels).map(l => +l);

  const textAreaClass = `text_area_container ${style.text_area_container} ${
    spacedText ? style.text_area_container_visible : ''
  }`;

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
        className={style.annotations_container}
        style={{
          pointerEvents: annoEditIsCreating ? 'none' : 'initial',
        }}
      >
        {annotationsWithPosition.map((ann, i) => {
          const legend = annotationLegendsColored.find(
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
              legendColor={legend.color}
              position={ann.position}
              linkEditIsCreating={linkEditIsCreating}
              linkEditIsDragging={linkEditIsDragging}
              linkEditFromEntryId={linkEditFromEntryId}
              linkEditToEntryId={linkEditToEntryId}
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
              position={ann.position}
              annotation={ann.annotation}
              isSelected={isSelected}
              selectedLegendAttributeIds={selectedLegendAttributeIds}
            />
          );
        })}
      </div>

      <div
        className={style.links_container}
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

      <ConnectorContainer
        linkEditIsDragging={linkEditIsDragging}
        textNodeEl={textNodeEl.current}
        annotationsWithPosition={annotationsWithPosition}
        linkEditFromEntryId={linkEditFromEntryId}
      />
      <LineWithArrowContainer
        linkEditIsCreating={linkEditIsCreating}
        linkEditIsDragging={linkEditIsDragging}
        linkEditFromEntryId={linkEditFromEntryId}
        linkEditToEntryId={linkEditToEntryId}
        annotationsWithPosition={annotationsWithPosition}
      />
    </div>
  );
}

function LineWithArrowContainer({
  linkEditIsCreating,
  linkEditIsDragging,
  linkEditFromEntryId,
  linkEditToEntryId,
  annotationsWithPosition,
}: {
  linkEditIsCreating: boolean;
  linkEditIsDragging: boolean;
  linkEditFromEntryId: string | null;
  linkEditToEntryId: string | null;
  annotationsWithPosition: {
    position: IAnnotationPosition;
    annotation: IAnnotation;
  }[];
}) {
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

function ConnectorContainer({
  linkEditIsDragging,
  textNodeEl,
  annotationsWithPosition,
  linkEditFromEntryId,
}: {
  linkEditIsDragging: boolean;
  textNodeEl: HTMLDivElement | null;
  linkEditFromEntryId: string | null;
  annotationsWithPosition: {
    position: IAnnotationPosition;
    annotation: IAnnotation;
  }[];
}) {
  if (!linkEditIsDragging) {
    return null;
  }

  if (!textNodeEl) {
    return null;
  }

  const textNodeRect = textNodeEl.getBoundingClientRect();
  const startAnnotaion = annotationsWithPosition.find(
    link => link.annotation.id === linkEditFromEntryId
  );

  if (!startAnnotaion) return null;

  return (
    <div className={style.link_edit_container}>
      <LinkEditConnector
        // annotation={startAnnotaion}
        position={startAnnotaion.position}
        // fromEntryId={linkEditFromEntryId}
        offsetX={textNodeRect.left}
        offsetY={textNodeRect.top}
      />
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
