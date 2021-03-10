import React from 'react';
import {IAnnotation} from '../lib/interfaces';
import Attributes from './Attributes';
import style from '../styles/AnnotationDetail.module.css';
import {useTextViewerDispatch} from '../contexts/text-viewer.context';
import {shortId} from '../lib/utils';
import {OnEventType} from './TextViewer';

export interface AnnotationDetailProp {
  annotation: IAnnotation;
  parentAnnotations: IAnnotation[];
  childAnnotations: IAnnotation[];
  onEvent?: OnEventType;
}

export default function AnnotationDetail({
  annotation,
  parentAnnotations,
  childAnnotations,
  onEvent,
}: AnnotationDetailProp) {
  const dispatch = useTextViewerDispatch();

  function renderLinkedAnnotations(annotations: IAnnotation[], title: string) {
    if (!annotations.length) {
      return null;
    }

    return (
      <div className={style.linked_annotation_container}>
        <strong>{title}</strong>
        {annotations.map(ann => {
          return (
            <span
              key={ann.id}
              title={ann.id}
              className={style.linked_annotation}
              onClick={() => {
                dispatch({
                  type: 'select-annotation',
                  annotationId: ann.id,
                });
              }}
            >
              {shortId(ann.id)}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div className={style.annotation_detail}>
      {renderLinkedAnnotations(parentAnnotations, '↘ parents')}
      {renderLinkedAnnotations(childAnnotations, '↗ children')}

      <div className={style.annotation_detail_section}>
        <h2>Attributes</h2>
        <div className={style.annotation_detail_section_body}>
          <Attributes
            attributes={{
              id: annotation.id,
              ...annotation.attributes,
            }}
          />
        </div>
      </div>

      <div>
        <button
          onClick={() => {
            if (onEvent) {
              onEvent({
                type: 'annotation-delete',
                annotationId: annotation.id,
              });
            }

            dispatch({
              type: 'delete-annotation',
              annotationId: annotation.id,
            });
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
}
