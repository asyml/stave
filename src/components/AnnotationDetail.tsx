import React from 'react';
import { IAnnotation } from '../lib/interfaces';
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
      <Attributes
        attributes={{
          id: annotation.id,
          ...annotation.attributes,
        }}
      />
    </div>
  );
}
