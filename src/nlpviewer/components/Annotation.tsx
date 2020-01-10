import React, { memo } from 'react';
import { IAnnotation, IAnnotationPosition } from '../lib/interfaces';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';
import style from '../styles/Annotation.module.css';

export interface AnnotaionProp {
  annotation: IAnnotation;
  isSelected: boolean;
  isHighlighted: boolean;
  legendColor: string;
  position: IAnnotationPosition;
  linkEditIsCreating: boolean;
  linkEditIsDragging: boolean;
  linkEditToEntryId: string | null;
  linkEditFromEntryId: string | null;
}

function Annotaion({
  annotation,
  isSelected,
  isHighlighted,
  legendColor,
  position,
  linkEditIsCreating,
  linkEditIsDragging,
  linkEditFromEntryId,
  linkEditToEntryId,
}: AnnotaionProp) {
  const dispatch = useTextViewerDispatch();

  return (
    <>
      {position.rects.map((rect, i) => {
        const isConnectPointActive =
          (linkEditIsDragging || linkEditIsCreating) &&
          linkEditFromEntryId === annotation.id;

        return (
          <div
            key={i}
            className={`${style.annotation_container}
              ${
                isHighlighted || isSelected
                  ? style.annotation_container_selected
                  : ''
              }
              `}
            style={{
              transform: `translate(${rect.x - 1}px,${rect.y}px)`,
            }}
            data-annotaion-id={annotation.id}
            onMouseEnter={() => {
              if (!isHighlighted) {
                dispatch({
                  type: 'highlight-annotation',
                  annotationId: annotation.id,
                });
              }

              if (linkEditToEntryId !== annotation.id) {
                dispatch({
                  type: 'set-create-link-target',
                  annotationId: annotation.id,
                });
              }
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
              className={`${style.annotaion}`}
              style={{
                marginTop: -2,
                height: rect.height,
                width: rect.width + 2,
                borderTopColor: legendColor,
                borderTopWidth: 5,
                borderTopStyle: 'solid',
                background:
                  isHighlighted || isSelected || isConnectPointActive
                    ? legendColor
                    : undefined,
              }}
              draggable={true}
              onDragStart={e => {
                e.dataTransfer.dropEffect = 'move';
                e.dataTransfer.setData(
                  'text/plain',
                  JSON.stringify({
                    type: 'drag-annotation',
                    annotationId: annotation.id,
                  })
                );
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
            >
              <div
                className={`${style.annotaion_inner_left}`}
                style={{ borderRightColor: legendColor }}
              ></div>
              <div
                className={`${style.annotaion_inner_right}`}
                style={{ borderLeftColor: legendColor }}
              ></div>
            </div>
            <div
              className={`${style.connect_point}
              ${isConnectPointActive && style.connect_point_active}`}
              style={{
                display:
                  linkEditFromEntryId === annotation.id ? 'block' : 'none',
              }}
              onMouseDown={() => {
                dispatch({ type: 'deselect-link' });
                dispatch({ type: 'deselect-annotation' });
                dispatch({
                  type: 'start-create-link',
                  annotationId: annotation.id,
                });
              }}
            >
              <span className={style.add_icon}></span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default memo(Annotaion);
