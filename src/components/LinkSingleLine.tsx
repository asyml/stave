import React from 'react';
import { ILink, IAnnotation, AnnotationPosition } from '../lib/interfaces';
import { attributeId } from '../lib/utils';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';
import style from '../styles/Link.module.css';

export interface LinkSingleLineProp {
  linkWithPosition: {
    link: ILink;
    fromEntryWithPos: {
      position: AnnotationPosition;
      annotation: IAnnotation;
    };
    toEntryWithPos: {
      position: AnnotationPosition;
      annotation: IAnnotation;
    };
    fromLinkX: number;
    toLinkX: number;
    fromLinkY: number;
    toLinkY: number;
  };
  isSelected: boolean;
  isHightlighted: boolean;
  isCollapsed: boolean;
  linkHeight: Record<string, Record<string, number>>;
  selectedLegendAttributeIds: string[];
}

const lineMaskWidth = 8;
const lineMaskColor = 'none';
const textLinkDistance = 8;
const borderRadius = 8;

export default function LinkSingleLine({
  linkWithPosition,
  isSelected,
  isHightlighted,
  isCollapsed,
  linkHeight,
  selectedLegendAttributeIds,
}: LinkSingleLineProp) {
  const dispatch = useTextViewerDispatch();

  const borderWidth = '1px';
  const borderColor = isSelected || isHightlighted ? '#555' : '#bbb';
  const zIndex = isSelected || isHightlighted ? 1 : 0;
  const height = isCollapsed
    ? textLinkDistance
    : textLinkDistance +
      linkHeight[linkWithPosition.link.id][linkWithPosition.fromLinkY];
  const goLeft = linkWithPosition.fromLinkX > linkWithPosition.toLinkX;
  const arrowRadiusAdjust = Math.max(borderRadius - height, 0) / 2;
  const arrowPosition = {
    x: goLeft
      ? linkWithPosition.toLinkX - arrowRadiusAdjust
      : linkWithPosition.toLinkX - 4 + arrowRadiusAdjust,
    y: linkWithPosition.toLinkY - height - 2,
  };
  const linkLabelPosition = {
    x:
      Math.min(linkWithPosition.fromLinkX, linkWithPosition.toLinkX) +
      Math.abs(linkWithPosition.fromLinkX - linkWithPosition.toLinkX) / 2,
    y: linkWithPosition.toLinkY - height - 4,
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
      className="single-line-container"
      data-from-id={linkWithPosition.link.fromEntryId}
      data-to-id={linkWithPosition.link.toEntryId}
    >
      <div
        className={style.link_line}
        style={{
          height: height,
          width: Math.abs(
            linkWithPosition.fromLinkX - linkWithPosition.toLinkX
          ),
          position: 'absolute',
          top: linkWithPosition.fromLinkY - height,
          left: Math.min(linkWithPosition.fromLinkX, linkWithPosition.toLinkX),
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
          dispatch({ type: 'select-link', linkId: linkWithPosition.link.id })
        }
        onMouseEnter={() => {
          dispatch({
            type: 'highlight-link',
            linkId: linkWithPosition.link.id,
          });
        }}
        onMouseLeave={() => {
          dispatch({ type: 'unhighlight-link' });
        }}
        style={{
          position: 'absolute',
          width: Math.abs(
            linkWithPosition.fromLinkX - linkWithPosition.toLinkX
          ),
          height: lineMaskWidth,
          background: lineMaskColor,
          top: linkWithPosition.fromLinkY - height - lineMaskWidth / 2,
          left: Math.min(linkWithPosition.fromLinkX, linkWithPosition.toLinkX),
        }}
        className={style.link_event_mask}
      ></div>

      <div
        onClick={() =>
          dispatch({ type: 'select-link', linkId: linkWithPosition.link.id })
        }
        onMouseEnter={() => {
          dispatch({
            type: 'highlight-link',
            linkId: linkWithPosition.link.id,
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
          top: linkWithPosition.fromLinkY - height,
          left:
            Math.min(linkWithPosition.fromLinkX, linkWithPosition.toLinkX) -
            lineMaskWidth / 2,
        }}
        className={style.link_event_mask}
      ></div>

      <div
        onClick={() =>
          dispatch({ type: 'select-link', linkId: linkWithPosition.link.id })
        }
        onMouseEnter={() => {
          dispatch({
            type: 'highlight-link',
            linkId: linkWithPosition.link.id,
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
          top: linkWithPosition.fromLinkY - height,
          left:
            Math.min(linkWithPosition.fromLinkX, linkWithPosition.toLinkX) +
            Math.abs(linkWithPosition.fromLinkX - linkWithPosition.toLinkX) -
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

      {linkLabel && !isCollapsed ? (
        <div
          className={style.link_label}
          style={{
            transform: `translate(-50%)`,
            position: 'absolute',
            textAlign: goLeft ? 'left' : 'right',
            top: `${linkLabelPosition.y}px`,
            left: `${linkLabelPosition.x}px`,
            color: isSelected || isHightlighted ? '#555' : '#999',
          }}
        >
          {linkLabel}
        </div>
      ) : null}
    </div>
  );
}
