import React from 'react';
import { IAnnotation } from '../lib/interfaces';
import style from '../styles/AnnotationAttribute.module.css';

export interface AnnotationAttributeProp {
  annotation: IAnnotation | null;
}

export default function AnnotationAttribute({
  annotation
}: AnnotationAttributeProp) {
  if (annotation === null) {
    return null;
  }

  return (
    <div>
      {Object.keys(annotation.attributes).map(key => (
        <div className={style.attribute} key={key}>
          <div className={style.attribute_name}>{key}</div>

          {Array.isArray(annotation.attributes[key]) ? (
            <ul className={style.attribute_value_array}>
              {annotation.attributes[key].map((item: string, i: number) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          ) : (
            <div className={style.attribute_value}>
              {annotation.attributes[key]}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
