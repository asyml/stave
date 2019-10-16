import React from 'react';
import { IAnnotationPosition, IAnnotation } from '../lib/interfaces';
import style from '../styles/AnnotationLabel.module.css';
import { attributeId } from '../lib/utils';

export interface AnnotationLabelProp {
  annotationWithPosition: {
    position: IAnnotationPosition;
    annotation: IAnnotation;
  };
  isSelected: boolean;
  selectedLegendAttributeIds: string[];
}

export default function AnnotationLabel({
  annotationWithPosition,
  isSelected,
  selectedLegendAttributeIds,
}: AnnotationLabelProp) {
  const attrKeys = Object.keys(
    annotationWithPosition.annotation.attributes
  ).filter(attrKey => {
    if (isSelected) {
      return true;
    } else {
      return (
        selectedLegendAttributeIds.indexOf(
          attributeId(annotationWithPosition.annotation.legendId, attrKey)
        ) > -1
      );
    }
  });

  return (
    <div
      key={annotationWithPosition.annotation.id}
      className={isSelected ? style.annotation_attr_container_selected : ''}
      style={{
        position: 'absolute',
        zIndex: isSelected ? 10 : 0,
        transform: `translate(-50%, 0)`,
        top: annotationWithPosition.position.rects[0].y + 20,
        left:
          annotationWithPosition.position.rects[0].x +
          annotationWithPosition.position.rects[0].width / 2,
        fontSize: 10,
        backgroundColor: 'white',
      }}
    >
      {annotationWithPosition.position.rects.map((rect, i) => {
        return attrKeys.map((attrKey, j) => {
          return (
            <div
              className={
                isSelected
                  ? style.annotation_attr_rect_selected
                  : style.annotation_attr_rect
              }
              key={attrKey + i}
              style={{
                ...(!isSelected && {
                  top: j * 2,
                  left: j * 2,
                }),
              }}
            >
              {isSelected ? (
                <>
                  <span className={style.annotation_attr_label}>{attrKey}</span>
                  <span className={style.annotation_attr_value}>
                    {annotationWithPosition.annotation.attributes[attrKey]}
                  </span>
                </>
              ) : (
                (annotationWithPosition.annotation.attributes[attrKey] || '')
                  .substring(0, 3)
                  .toUpperCase()
              )}
            </div>
          );
        });
      })}
    </div>
  );
}
