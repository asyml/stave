import React from 'react';
// @ts-ignore
import style from '../styles/CrossDocStyle.module.css';
import {ISinglePack, IAnnotation} from "../../nlpviewer";
import Event from "./Event";

export interface TextAreaBProp {
    text: string;
    annotations : IAnnotation[];
    NER: IAnnotation[];
    AnowOnEventIndex:number;
    BnowOnEventIndex: number;
    BSelectedIndex:number[]
    eventClickCallBack: any;
}

function TextAreaB({ text, annotations, NER , AnowOnEventIndex, BnowOnEventIndex, BSelectedIndex, eventClickCallBack}: TextAreaBProp) {
    const highlightedText = highlighHelper(text, annotations, NER);


    function highlighHelper(text:String, annotations: IAnnotation[], NER : IAnnotation[]) {
        let to_return : any[]= [];
        let i:number;
        let fragment = modifyNER(text, 0, annotations[0].span.begin, NER);
        to_return = to_return.concat(fragment);
        // to_return.push(text.substring(0,annotations[0].span.begin));
        for (i = 0; i < annotations.length-1; i ++) {
            let initSelected = 0;
            if (i === BnowOnEventIndex) {
                initSelected = 1;
            } else if (BSelectedIndex.includes(i)) {
                initSelected = 2;
            }
            to_return.push((<Event key={i}
                                   eventIndex = {i}
                                   eventText = {text.substring(annotations[i].span.begin, annotations[i].span.end)}
                                   AnowOnEventIndex = {AnowOnEventIndex}
                                   initSelected={initSelected}
                                   eventClickCallBack = {eventClickCallBack}/>));
            fragment = modifyNER(text, annotations[i].span.end, annotations[i+1].span.begin, NER);
            to_return = to_return.concat(fragment);
            // to_return.push(text.substring(annotations[i].span.end, annotations[i+1].span.begin));
        }

        let initSelected = 0;
        if (i === BnowOnEventIndex) {
            initSelected = 1;
        } else if (BSelectedIndex.includes(i)) {
            initSelected = 2;
        }

        to_return.push((<Event key={i}
                               eventIndex = {i}
                               eventText = {text.substring(annotations[i].span.begin, annotations[i].span.end)}
                               AnowOnEventIndex = {AnowOnEventIndex}
                               initSelected={initSelected}
                               eventClickCallBack = {eventClickCallBack}/>));
        fragment = modifyNER(text, annotations[i].span.end, text.length, NER);
        to_return = to_return.concat(fragment);
        // to_return.push(text.substring(annotations[i].span.end));
        return to_return;
    }

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

function modifyNER(text:String, start:number, end:number, NER: IAnnotation[]) {
    let result = [];
    let ner_start = -1;
    let ner_end = -1;
    for (let i = 0; i < NER.length; i++) {
        if (NER[i].span.end > start){
            ner_start = i;
            break;
        }
    }
    for (let i = NER.length-1; i >=0; i--) {
        if (NER[i].span.begin < end){
            ner_end = i;
            break;
        }
    }
    if (ner_start === -1 || ner_end === -1) {
        return [text.substring(start,end)];
    }

    let prev_end = start;
    if (NER[ner_start].span.begin < start) {
        result.push(<b>{text.substring(start, Math.min(NER[ner_start].span.end, end))}</b>);
        prev_end = NER[ner_start].span.end;
        ner_start ++;
    }


    for (let i = ner_start; i <= ner_end; i++) {
        result.push(text.substring(prev_end, NER[i].span.begin));
        result.push(<b>{text.substring(NER[i].span.begin, Math.min(NER[i].span.end, end))}</b>);
        prev_end = Math.min(NER[i].span.end, end);
    }
    if (prev_end < end){
        result.push(text.substring(prev_end, end));
    }
    return result;
}



export default TextAreaB;
