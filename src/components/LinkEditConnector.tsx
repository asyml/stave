import React, { useState, useEffect } from 'react';
import {
  AnnotationPosition,
  IAnnotation,
  ITextNodeDimension,
} from '../lib/interfaces';
import style from '../styles/LinkEditConnector.module.css';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';

export interface LinkEditConnectorProp {
  annotationsWithPosition: {
    position: AnnotationPosition;
    annotation: IAnnotation;
  }[];
  fromEntryId: string | null;
  textNodeDimension: ITextNodeDimension;
}

export default function LinkEditConnector({
  annotationsWithPosition,
  fromEntryId,
  textNodeDimension,
}: LinkEditConnectorProp) {
  const dispatch = useTextViewerDispatch();
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    function updatePos(e: MouseEvent) {
      requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    }

    function endMove() {
      dispatch({
        type: 'end-create-link',
      });
    }

    window.addEventListener('mousemove', updatePos);
    window.addEventListener('mouseup', endMove);

    return () => {
      window.removeEventListener('mousemove', updatePos);
      window.removeEventListener('mouseup', endMove);
    };
  }, [dispatch]);

  const startAnnotaion = annotationsWithPosition.find(
    link => link.annotation.id === fromEntryId
  );
  const isMoved = pos.x !== 0 || pos.y !== 0;
  if (!startAnnotaion || !fromEntryId || !isMoved) return null;

  let x =
    startAnnotaion.position.rects[0].x + startAnnotaion.position.rects[0].width;
  let y = startAnnotaion.position.rects[0].y;

  let width = pos.x - x - textNodeDimension.clientX;
  let height = pos.y - y - textNodeDimension.clientY;

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
    >
      <span className={style.link_drag_arrow}></span>
    </div>
  );
}
