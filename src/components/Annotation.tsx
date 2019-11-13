import React from 'react';
import {
  IAnnotation,
  IColoredLegend,
  IAnnotationPosition,
  IGroup,
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
  position: IAnnotationPosition;
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
    highlightedAnnotationIds,
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

        const isConnectPointActive =
          (linkEditIsDragging || linkEditIsCreating) &&
          linkEditFromEntryId === annotation.id;

        return (
          <div
            key={i}
            className={`${style.annotation_container}
              ${isLinkTarget && style.annotation_container_to_be_link}
              ${isSelected && style.annotation_container_selected}`}
            style={{
              transform: `translate(${rect.x}px,${rect.y}px)`,
            }}
            data-annotaion-id={annotation.id}
            onMouseEnter={() => {
              if (!highlightedAnnotationIds.includes(annotation.id)) {
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
              className={style.annotaion}
              style={{
                opacity,
                background: legend.color,
                height: rect.height,
                width: rect.width,
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
            ></div>
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

export default Annotaion;
