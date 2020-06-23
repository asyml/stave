import React, { useRef, useEffect, useMemo } from 'react';
import style from '../styles/CrossDocStyle.module.css';
import {IAnnotation, ISinglePack} from "../../nlpviewer";
import {OnEventType} from "../index"
import {IRange} from "./lib/interfaces";


export interface TextAreaAProp {
  textPack: ISinglePack;
  AnowOnEventIndex:number;
}


function TextAreaA({ textPack, AnowOnEventIndex}: TextAreaAProp) {
  let { annotations, text, links } = textPack;
  if (AnowOnEventIndex >= textPack.annotations.length) {
      return (
          <div className={style.text_area_container_visible}>
              <div className={style.text_node_container}>
                  {text}
              </div>
          </div>
      )
  }

  const highlightedText = highlighHelper(text, annotations, AnowOnEventIndex);
  return (
    <div
      className={style.text_area_container_visible}
    >
      <div className={style.text_node_container}>
          {highlightedText}
      </div>
    </div>
  );
}

function highlighHelper(text:String, annotations: IAnnotation[], AnowOnEventIndex:number) {
  let to_return = [];
  // Outer loop to create parent


  let i:number;
  to_return.push(text.substring(0,annotations[0].span.begin));
  for (i = 0; i < annotations.length-1; i ++) {
    const nowStyle = AnowOnEventIndex == i ? style.a_now_event : style.a_other_event;
    to_return.push((<span className={nowStyle}>{text.substring(annotations[i].span.begin, annotations[i].span.end)}</span>));
    to_return.push(text.substring(annotations[i].span.end, annotations[i+1].span.begin));
  }
  const nowStyle = AnowOnEventIndex == i ? style.a_now_event : style.a_other_event;
  to_return.push((<span className={nowStyle}>{text.substring(annotations[i].span.begin, annotations[i].span.end)}</span>));
  to_return.push(text.substring(annotations[i].span.end));
  return to_return;
}



export default TextAreaA;
