import React from 'react';
import style from '../styles/CrossDocStyle.module.css';
import {ISinglePack, IAnnotation} from "../../nlpviewer";
import Event from "./Event";

export interface TextAreaBProp {
    textPack: ISinglePack;
    AnowOnEventIndex:number;
    BnowOnEventIndex: number;
    BSelectedIndex:number[]
    eventClickCallBack: any;
}

function TextAreaB({ textPack, AnowOnEventIndex, BnowOnEventIndex, BSelectedIndex, eventClickCallBack}: TextAreaBProp) {
    let {annotations, text, links} = textPack;
    console.log(BSelectedIndex);
    const highlightedText = highlighHelper(text, annotations);


    function highlighHelper(text:String, annotations: IAnnotation[]) {
        let to_return = [];
        let i:number;
        to_return.push(text.substring(0,annotations[0].span.begin));
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
            to_return.push(text.substring(annotations[i].span.end, annotations[i+1].span.begin));
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
        to_return.push(text.substring(annotations[i].span.end));
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




export default TextAreaB;
