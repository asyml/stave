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
            className={style.annotaion_container}
            style={{
              transform: `translate(${rect.x}px,${rect.y}px)`,
            }}
          >
            <div
              className={style.annotaion}
              style={{
                opacity,
                background: legend.color,
                borderBottom: isSelected ? `2px solid #333` : 'none',
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
                dispatch({
                  type: 'set-create-link-target',
                  annotationId: annotation.id,
                });
              }}
              onMouseLeave={() => {
                dispatch({
                  type: 'unhighlight-annotation',
                });
                dispatch({
                  type: 'set-create-link-target',
                  annotationId: null,
                });
              }}
            ></div>
            <div
              className={style.connect_point}
              style={{
                background: legend.color,
              }}
              onMouseDown={() => {
                dispatch({
                  type: 'start-create-link',
                  annotationId: annotation.id,
                });
              }}
            ></div>
          </div>
        );
      })}
    </>
  );
}

export default Annotaion;
