import React from 'react';
import { IAnnotation } from '../lib/interfaces';
import Attributes from './Attributes';
import style from '../styles/AnnotationDetail.module.css';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';

export interface AnnotationDetailProp {
  annotation: IAnnotation;
  parentAnnotations: IAnnotation[];
  childAnnotations: IAnnotation[];
}

export default function AnnotationDetail({
  annotation,
  parentAnnotations,
  childAnnotations,
}: AnnotationDetailProp) {
  const dispatch = useTextViewerDispatch();

  function renderLinkedAnnotations(annotations: IAnnotation[], title: string) {
    if (!annotations.length) {
      return null;
    }

    return (
      <div className={style.annotaition_detail_section}>
        <h2>{title}</h2>
        <div className={style.annotaition_detail_section_body}>
          <ul className={style.linked_annotation_list}>
            {annotations.map(ann => {
              return (
                <li
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
                  {ann.id}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={style.annotaition_detail}>
      {renderLinkedAnnotations(parentAnnotations, 'Parent Annotations')}
      {renderLinkedAnnotations(childAnnotations, 'Child Annotations')}

      <div className={style.annotaition_detail_section}>
        <h2>Attributes</h2>
        <div className={style.annotaition_detail_section_body}>
          <Attributes
            attributes={{
              id: annotation.id,
              ...annotation.attributes,
            }}
          />
        </div>
      </div>
    </div>
  );
}
