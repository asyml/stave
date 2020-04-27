import React, { useState, useRef, useEffect, useMemo } from 'react';
import style from '../styles/CrossDocStyle.module.css';
import {ISinglePack, IAnnotation} from "../../nlpviewer";
import {IMultiPack} from "./lib/interfaces";
import Event from "./Event";
import {highlight_legend} from "../index";

export interface TextAreaBProp {
  textPack: ISinglePack;
  nowOnEventIndex: number;
  multiPack: IMultiPack;
}

function TextAreaB({ textPack, nowOnEventIndex, multiPack}: TextAreaBProp) {
  let { annotations, text, links } = textPack;
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
  annotations.sort(function(a, b){return a.span.begin - b.span.begin});
  const highlight_annotations = annotations.filter((entry:IAnnotation)=>entry.legendId == highlight_legend);
  const highlightedText = highlighHelper(text, nowOnEvent);
  return (
    <div className={style.text_area_container_visible} >
      <div className={style.text_node_container} >
        {highlightedText}
      </div>
    </div>
  );
}

function highlighHelper(text:String, nowOnEvent:IAnnotation) {
  let to_return = [];
  // Outer loop to create parent
  to_return.push(text.substring(0,nowOnEvent.span.begin));
  to_return.push(<Event eventText={text.substring(nowOnEvent.span.begin, nowOnEvent.span.end)}
                        nowOnEvent={nowOnEvent}/>);


  to_return.push(text.substring(nowOnEvent.span.end));
  return to_return;
}


export default TextAreaB;
