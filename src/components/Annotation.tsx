import React from 'react';
import { IAnnotation, ILegend } from '../lib/interfaces';
import { AnnotationPosition } from './TextViewer';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';

export interface AnnotaionProp {
  annotation: IAnnotation;
  isSelected: boolean;
  legend: ILegend;
  position: AnnotationPosition;
}

function Annotaion({
  annotation,
  isSelected,
  legend,
  position
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
              opacity: isSelected ? 0.4 : 0.2,
              transform: `translate(${rect.x}px,${rect.y}px)`,
              height: rect.height,
              width: rect.width,
              cursor: 'pointer'
            }}
            onClick={() => {
              isSelected
                ? dispatch({
                    type: 'deselect-annotation'
                  })
                : dispatch({
                    type: 'select-annotation',
                    annotationId: annotation.id
                  });
            }}
          ></div>
        );
      })}
    </>
  );
}

export default Annotaion;
