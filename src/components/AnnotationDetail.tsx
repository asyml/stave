import React from 'react';
import { IAnnotation } from '../lib/interfaces';
// import style from '../styles/AnnotationDetail.module.css';
import Attributes from './Attributes';

export interface AnnotationDetailProp {
  annotation: IAnnotation | null;
}

export default function AnnotationDetail({ annotation }: AnnotationDetailProp) {
  if (annotation === null) {
    return null;
  }

  return (
    <div>
      {/* <div className={style.attribute}>
        <div className={style.attribute_name}>id</div>
        <div className={style.attribute_value}>{annotation.id}</div>
      </div> */}

      <Attributes
        attributes={{
          ...annotation.attributes,
          id: annotation.id
        }}
      />

      {/* {Object.keys(annotation.attributes).map(key => (
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
      ))} */}
    </div>
  );
}
