import React, { useRef, useEffect, useMemo } from 'react';
import style from '../styles/CrossDocStyle.module.css';
import {IAnnotation, ISinglePack} from "../../nlpviewer";



export interface TextAreaAProp {
  textPack: ISinglePack;
  nowOnEventIndex: number;
  // selectedText: String | null;
}


function TextAreaA({ textPack, nowOnEventIndex}: TextAreaAProp) {
  let { annotations, text, links } = textPack;
  // console.log(annotations);
  if (nowOnEventIndex >= textPack.annotations.length) {
    return (
        <div className={style.text_area_container_visible}>
          <div className={style.text_node_container}>
            {text}
          </div>
        </div>
    )
  }

  const nowOnEvent = textPack.annotations[nowOnEventIndex];

  const highlightedText = (
      <div>
        {text.substring(0, nowOnEvent.span.begin)}
        <span style={{backgroundColor:"#9dc6a7"}}> {text.substring(nowOnEvent.span.begin, nowOnEvent.span.end)} </span>
        {text.substring(nowOnEvent.span.end)}
      </div>
  );


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



export default TextAreaA;
