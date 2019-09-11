import React, { useRef, useEffect, useState } from 'react';
import style from './TextViewer.module.css';
import { IAnnotation, ILink, IGroup } from '../lib/interfaces';
import Annotation from './Annotation';

export interface TextViewerProp {
  text: string;
  annotations: IAnnotation[];
  links: ILink[];
  groups: IGroup[];
}

export interface AnnotationPosition {
  rects: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
}

function TextViewer({ annotations, links, text }: TextViewerProp) {
  const inputEl = useRef<HTMLDivElement>(null);
  const [annotationPositions, setAnnotationPositions] = useState<
    AnnotationPosition[]
  >([]);

  useEffect(() => {
    if (inputEl && inputEl.current) {
      const textNode = inputEl.current.childNodes[0];

      const annotationBlocks = annotations.map(anno => {
        const range = document.createRange();
        range.setStart(textNode, anno.span.begin);
        range.setEnd(textNode, anno.span.end);
        const rects = Array.from(range.getClientRects() as DOMRectList);
        return {
          rects: rects.map(rect => ({
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height
          }))
        };
      });

      setAnnotationPositions(annotationBlocks);
    }
  }, [annotations]);

  return (
    <div ref={inputEl} className={style.text}>
      {text}

      {annotationPositions.length
        ? annotationPositions.map((position, i) => {
            return (
              <Annotation
                key={i}
                annotation={annotations[i]}
                position={position}
              />
            );
          })
        : null}
    </div>
  );
}

export default TextViewer;
