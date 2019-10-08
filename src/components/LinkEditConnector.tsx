import React from 'react';
import {
  AnnotationPosition,
  IAnnotation,
  ITextNodeDimension,
  IPos,
} from '../lib/interfaces';
import style from '../styles/LinkEditConnector.module.css';

export interface LinkEditConnectorProp {
  annotationsWithPosition: {
    position: AnnotationPosition;
    annotation: IAnnotation;
  }[];
  fromEntryId: string | null;
  movePos: IPos;
  textNodeDimension: ITextNodeDimension;
}

export default function LinkEditConnector({
  annotationsWithPosition,
  fromEntryId,
  movePos,
  textNodeDimension,
}: LinkEditConnectorProp) {
  const startAnnotaion = annotationsWithPosition.find(
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
