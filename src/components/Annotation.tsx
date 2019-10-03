import React from 'react';
import {
  IAnnotation,
  IColoredLegend,
  AnnotationPosition,
} from '../lib/interfaces';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';
import style from '../styles/Annotation.module.css';

export interface AnnotaionProp {
  annotation: IAnnotation;
  isSelected: boolean;
  isHighlighted: boolean;
  legend: IColoredLegend;
  position: AnnotationPosition;
}

function Annotaion({
  annotation,
  isSelected,
  isHighlighted,
  legend,
  position,
}: AnnotaionProp) {
  const dispatch = useTextViewerDispatch();

  return (
    <>
      {position.rects.map((rect, i) => {
        let opacity = 0.2;
        if (isHighlighted) opacity = 0.4;
        if (isSelected) opacity = 0.66;

        return (
          <div
            key={i}
            className={style.annotaion}
            style={{
              background: legend.color,
              opacity,
              borderBottom: isSelected ? `2px solid #333` : 'none',
              transform: `translate(${rect.x}px,${rect.y}px)`,
              height: rect.height,
              width: rect.width,
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
            onMouseEnter={() => {
              dispatch({
                type: 'highlight-annotation',
                annotationId: annotation.id,
              });
            }}
            onMouseLeave={() => {
              dispatch({
                type: 'unhighlight-annotation',
              });
            }}
          ></div>
        );
      })}
    </>
  );
}

export default Annotaion;
