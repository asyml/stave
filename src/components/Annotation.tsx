import React from 'react';
import { IAnnotation, IColoredLegend } from '../lib/interfaces';
import { AnnotationPosition } from './TextViewer';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';

export interface AnnotaionProp {
  annotation: IAnnotation;
  isSelected: boolean;
  legend: IColoredLegend;
  position: AnnotationPosition;
}

function Annotaion({
  annotation,
  isSelected,
  legend,
  position,
}: AnnotaionProp) {
  const dispatch = useTextViewerDispatch();

  return (
    <>
      {position.rects.map((rect, i) => {
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              background: legend.color,
              top: 0,
              left: 0,
              opacity: isSelected ? 0.5 : 0.3,
              transform: `translate(${rect.x}px,${rect.y}px)`,
              height: rect.height,
              width: rect.width,
              cursor: 'pointer',
            }}
            onClick={() => {
              isSelected
                ? dispatch({
                    type: 'deselect-annotation',
                  })
                : dispatch({
                    type: 'select-annotation',
                    annotationId: annotation.id,
                  });
            }}
          ></div>
        );
      })}
    </>
  );
}

export default Annotaion;
