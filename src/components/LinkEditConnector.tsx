import React, { useState, useEffect } from 'react';
import { IAnnotationPosition, IAnnotation } from '../lib/interfaces';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';
import LineWithArrow from './LineWithArrow';

export interface LinkEditConnectorProp {
  annotationsWithPosition: {
    position: IAnnotationPosition;
    annotation: IAnnotation;
  }[];
  fromEntryId: string | null;
  offsetX: number;
  offsetY: number;
}

export default function LinkEditConnector({
  annotationsWithPosition,
  fromEntryId,
  offsetX,
  offsetY,
}: LinkEditConnectorProp) {
  const dispatch = useTextViewerDispatch();
  const [pos, setPos] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    let moved = false;

    function updatePos(e: MouseEvent) {
      moved = true;
      requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
      });
    }

    function endMove() {
      dispatch({ type: 'stop-create-link-dragging', hasMoved: moved });
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

  const fromPos = {
    x,
    y,
  };

  const toPos = {
    x: pos.x - offsetX,
    y: pos.y - offsetY,
  };

  return <LineWithArrow fromPos={fromPos} toPos={toPos} />;
}
