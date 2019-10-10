import React from 'react';
import {
  IAnnotation,
  IColoredLegend,
  AnnotationPosition,
} from '../lib/interfaces';
import {
  useTextViewerDispatch,
  useTextViewerState,
} from '../contexts/text-viewer.context';
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
  const {
    linkEditFromEntryId,
    linkEditToEntryId,
    linkEditIsDragging,
    linkEditIsCreating,
  } = useTextViewerState();

  const isLinkTarget =
    linkEditIsCreating &&
    linkEditFromEntryId !== annotation.id &&
    (!linkEditToEntryId || linkEditIsDragging);

  return (
    <>
      {position.rects.map((rect, i) => {
        let opacity = 0.2;
        if (isHighlighted) opacity = 0.4;
        if (isSelected) opacity = 0.66;

        return (
          <div
            key={i}
            className={`${style.annotaion_container} ${isLinkTarget &&
              style.annotaion_container_to_be_link}`}
            style={{
              transform: `translate(${rect.x}px,${rect.y}px)`,
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
            ></div>
            <div
              className={style.connect_point}
              style={{
                display:
                  linkEditFromEntryId === annotation.id ? 'block' : 'none',
                background:
                  (linkEditIsDragging || linkEditIsCreating) &&
                  linkEditFromEntryId === annotation.id
                    ? '#555'
                    : undefined,
              }}
              onMouseDown={() => {
                dispatch({ type: 'deselect-link' });
                dispatch({ type: 'deselect-annotation' });
                dispatch({
                  type: 'start-create-link',
                  annotationId: annotation.id,
                });
              }}
              onClick={() => {
                dispatch({ type: 'deselect-link' });
                dispatch({ type: 'deselect-annotation' });
                dispatch({
                  type: 'start-create-link-two-step',
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
