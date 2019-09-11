import React from 'react';
import { IAnnotation } from '../lib/interfaces';
import { AnnotationPosition } from './TextViewer';

export interface AnnotaionProp {
  annotation: IAnnotation;
  position: AnnotationPosition;
}
function Annotaion({ annotation, position }: AnnotaionProp) {
  return (
    <>
      {position.rects.map((rect, i) => {
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              background: annotation.type.color,
              top: 0,
              left: 0,
              opacity: 0.2,
              transform: `translate(${rect.x}px,${rect.y}px)`,
              height: rect.height,
              width: rect.width
            }}
            onClick={() => {
              console.log(annotation);
            }}
          ></div>
        );
      })}
    </>
  );
}

export default Annotaion;
