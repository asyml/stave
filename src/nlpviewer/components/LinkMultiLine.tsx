import React, {memo} from 'react';
import {ILink, IAnnotation, IAnnotationPosition} from '../lib/interfaces';
import {attributeId, shouldMultiLineGoLeft} from '../lib/utils';
import {useTextViewerDispatch} from '../contexts/text-viewer.context';
import style from '../styles/Link.module.css';

export interface LinkMultiLineProp {
  linkWithPosition: {
    link: ILink;
    fromEntryWithPos: {
      position: IAnnotationPosition;
      annotation: IAnnotation;
    };
    toEntryWithPos: {
      position: IAnnotationPosition;
      annotation: IAnnotation;
    };
    fromLinkX: number;
    toLinkX: number;
    fromLinkY: number;
    toLinkY: number;
  };
  isSelected: boolean;
  isHightlighted: boolean;
  linkHeight: Record<string, Record<string, number>>;
  selectedLegendAttributeIds: string[];
  lineHeights: number[];
  collapsedLineIndexes: number[];
  lineStartX: number;
  lineWidth: number;
}

const lineMaskWidth = 8;
const lineMaskColor = 'none';
const textLinkDistance = 8;
const borderRadius = 8;

function LinkMultiLine({
  linkWithPosition,
  isSelected,
  isHightlighted,
  linkHeight,
  lineHeights,
  selectedLegendAttributeIds,
  collapsedLineIndexes,
  lineStartX,
  lineWidth,
}: LinkMultiLineProp) {
  const dispatch = useTextViewerDispatch();

  let borderColor = '#888';
  if (isSelected || isHightlighted) {
    borderColor = '#555';
  }

  let labelColor = '#666';
  if (isSelected || isHightlighted) {
    labelColor = '#333';
  }

  const borderWidth = isSelected || isHightlighted ? '2px' : '1px';
  const zIndex = isSelected || isHightlighted ? 1 : 0;
  const fromLineIndex = lineHeights.indexOf(linkWithPosition.fromLinkY);
  const fromLineCollapsed = collapsedLineIndexes.indexOf(fromLineIndex) !== -1;
  const fromLineHeight = fromLineCollapsed
    ? textLinkDistance
    : textLinkDistance +
      linkHeight[linkWithPosition.link.id][linkWithPosition.fromLinkY];

  const toLineIndex = lineHeights.indexOf(linkWithPosition.toLinkY);
  const toLineCollapsed = collapsedLineIndexes.indexOf(toLineIndex) !== -1;
  const toLineHeight = toLineCollapsed
    ? textLinkDistance
    : textLinkDistance +
      linkHeight[linkWithPosition.link.id][linkWithPosition.toLinkY];

  const goLeft = shouldMultiLineGoLeft(linkWithPosition, lineStartX, lineWidth);

  const sideGap = 5;
  const arrowRadiusAdjust = Math.max(borderRadius - toLineHeight, 0) / 2;

  const arrowGoLeft = !goLeft;
  const arrowPosition = {
    x: arrowGoLeft
      ? linkWithPosition.toLinkX - arrowRadiusAdjust
      : linkWithPosition.toLinkX - 4 + arrowRadiusAdjust,
    y: linkWithPosition.toLinkY - toLineHeight - 2,
  };
  const fromLineX = goLeft
    ? Math.min(linkWithPosition.fromLinkX, lineStartX) - sideGap
    : Math.min(linkWithPosition.fromLinkX, lineStartX + lineWidth);
  const fromLineWidth = goLeft
    ? Math.abs(linkWithPosition.fromLinkX - lineStartX) + sideGap
    : Math.abs(linkWithPosition.fromLinkX - (lineStartX + lineWidth)) + sideGap;

  const toLineX = goLeft
    ? Math.min(linkWithPosition.toLinkX, lineStartX) - sideGap
    : Math.min(linkWithPosition.toLinkX, lineStartX + lineWidth);
  const toLineWidth = goLeft
    ? Math.abs(linkWithPosition.toLinkX - lineStartX) + sideGap
    : Math.abs(linkWithPosition.toLinkX - (lineStartX + lineWidth)) + sideGap;

  const fromLinkLabelPosition = {
    x: fromLineX + fromLineWidth / 2,
    y: linkWithPosition.fromLinkY - fromLineHeight - 4,
  };

  const toLinkLabelPosition = {
    x: toLineX + toLineWidth / 2,
    y: linkWithPosition.toLinkY - toLineHeight - 4,
  };

  const linkLabel = Object.keys(linkWithPosition.link.attributes)
    .filter(attrKey => {
      return (
        selectedLegendAttributeIds.indexOf(
          attributeId(linkWithPosition.link.legendId, attrKey)
        ) > -1
      );
    })
    .map(attrKey => linkWithPosition.link.attributes[attrKey])
    .join(',');

  return (
    <div
      className="cross-line-container"
      data-from-id={linkWithPosition.link.fromEntryId}
      data-to-id={linkWithPosition.link.toEntryId}
    >
      <div
        className={style.link_line}
        style={{
          height: fromLineHeight,
          width: fromLineWidth,
          position: 'absolute',
          top: linkWithPosition.fromLinkY - fromLineHeight,
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
          top: linkWithPosition.toLinkY - toLineHeight,
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
              linkWithPosition.toLinkY -
                toLineHeight -
                (linkWithPosition.fromLinkY - fromLineHeight)
            ) + 1,
          width: 1,
          position: 'absolute',
          top: Math.min(
            linkWithPosition.toLinkY - toLineHeight,
            linkWithPosition.fromLinkY - fromLineHeight
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
          dispatch({type: 'select-link', linkId: linkWithPosition.link.id})
        }
        onMouseEnter={() => {
          dispatch({
            type: 'highlight-link',
            linkId: linkWithPosition.link.id,
          });
        }}
        onMouseLeave={() => {
          dispatch({type: 'unhighlight-link'});
        }}
        style={{
          position: 'absolute',
          width: fromLineWidth,
          height: lineMaskWidth,
          background: lineMaskColor,
          top: linkWithPosition.fromLinkY - fromLineHeight - lineMaskWidth / 2,
          left: fromLineX,
        }}
        className={style.link_event_mask}
      ></div>

      <div
        onClick={() =>
          dispatch({type: 'select-link', linkId: linkWithPosition.link.id})
        }
        onMouseEnter={() => {
          dispatch({
            type: 'highlight-link',
            linkId: linkWithPosition.link.id,
          });
        }}
        onMouseLeave={() => {
          dispatch({type: 'unhighlight-link'});
        }}
        style={{
          position: 'absolute',
          width: toLineWidth,
          height: lineMaskWidth,
          background: lineMaskColor,
          top: linkWithPosition.toLinkY - toLineHeight - lineMaskWidth / 2,
          left: toLineX,
        }}
        className={style.link_event_mask}
      ></div>

      <div
        onClick={() =>
          dispatch({type: 'select-link', linkId: linkWithPosition.link.id})
        }
        onMouseEnter={() => {
          dispatch({
            type: 'highlight-link',
            linkId: linkWithPosition.link.id,
          });
        }}
        onMouseLeave={() => {
          dispatch({type: 'unhighlight-link'});
        }}
        style={{
          position: 'absolute',
          width: lineMaskWidth,
          background: lineMaskColor,
          height: fromLineHeight,
          top: linkWithPosition.fromLinkY - fromLineHeight,
          left: fromLineX - lineMaskWidth / 2 + (goLeft ? fromLineWidth : 0),
        }}
        className={style.link_event_mask}
      ></div>

      <div
        onClick={() =>
          dispatch({type: 'select-link', linkId: linkWithPosition.link.id})
        }
        onMouseEnter={() => {
          dispatch({
            type: 'highlight-link',
            linkId: linkWithPosition.link.id,
          });
        }}
        onMouseLeave={() => {
          dispatch({type: 'unhighlight-link'});
        }}
        style={{
          position: 'absolute',
          width: lineMaskWidth,
          background: lineMaskColor,
          height: toLineHeight,
          top: linkWithPosition.toLinkY - toLineHeight,
          left: toLineX - lineMaskWidth / 2 + (goLeft ? toLineWidth : 0),
        }}
        className={style.link_event_mask}
      ></div>

      <div
        onClick={() =>
          dispatch({type: 'select-link', linkId: linkWithPosition.link.id})
        }
        onMouseEnter={() => {
          dispatch({
            type: 'highlight-link',
            linkId: linkWithPosition.link.id,
          });
        }}
        onMouseLeave={() => {
          dispatch({type: 'unhighlight-link'});
        }}
        style={{
          height:
            Math.abs(
              linkWithPosition.toLinkY -
                toLineHeight -
                (linkWithPosition.fromLinkY - fromLineHeight)
            ) + 1,
          width: lineMaskWidth,
          background: lineMaskColor,
          position: 'absolute',
          top: Math.min(
            linkWithPosition.toLinkY - toLineHeight,
            linkWithPosition.fromLinkY - fromLineHeight
          ),
          left: goLeft
            ? lineStartX - sideGap
            : lineStartX + lineWidth + sideGap - lineMaskWidth / 2,
        }}
        className={style.link_event_mask}
      ></div>

      <div
        className={`${style.arrow}
          ${(isSelected || isHightlighted) && style.arrow_large}`}
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
            transform: 'translate(-50%)',
            position: 'absolute',
            textAlign: goLeft ? 'left' : 'right',
            top: `${fromLinkLabelPosition.y}px`,
            left: `${fromLinkLabelPosition.x}px`,
            color: labelColor,
          }}
        >
          {linkLabel}
        </div>
      )}

      {toLineCollapsed ? null : (
        <div
          className={style.link_label}
          style={{
            transform: 'translate(-50%)',
            position: 'absolute',
            textAlign: goLeft ? 'left' : 'right',
            top: `${toLinkLabelPosition.y}px`,
            left: `${toLinkLabelPosition.x}px`,
            color: labelColor,
          }}
        >
          {linkLabel}
        </div>
      )}
    </div>
  );
}

export default memo(LinkMultiLine);
