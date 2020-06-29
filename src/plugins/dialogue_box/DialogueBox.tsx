import React from 'react';
import {Dispatch, State, IAnnotation } from '../../nlpviewer';
import {ISinglePack} from "../../nlpviewer"
import {PluginComponentProp} from "../lib/interface"
import style from "./DialogueBox.module.css"
import TextInput from "./TextInput"

function Utterance(text: string, annotation: IAnnotation){
    if (annotation.attributes.speaker === 'user'){
        return <div className={style.bubble_left} key={'utterance_bubble_' + annotation.id}>    
            <div key={'utterance_' + annotation.id}>
                {text.substring(annotation.span.begin, annotation.span.end)}
            </div>
        </div>
    }else if (annotation.attributes.speaker === 'ai'){
        return <div className={style.bubble_right} key={'utterance_bubble_' + annotation.id}>    
            <div key={'utterance_' + annotation.id}>
                {text.substring(annotation.span.begin, annotation.span.end)}
            </div>
        </div>
    } else{
        return <div className={style.bubble_right} key={'utterance_bubble_' + annotation.id}>    
            ...
        </div>
    }
}

function renderUtterances(textPack: ISinglePack){
    let {annotations, text} = textPack;

    const utterances = annotations.filter(
        (ann) => {
            // TODO: This did not read the class hierarchy.
            return ann.legendId === "ft.onto.base_ontology.Utterance"
        }
    );

    return (        
        <div key = 'plugin-dialogue-box'>
            <div key='dialogue-utterance-container'>
                { utterances.map((ann, i) =>{
                    return Utterance(text, ann);
                })}            
            </div>        
            <div key='dialogue-text-input'>
                <TextInput textValue='enter text here' textPack={textPack}></TextInput>
            </div>
        </div>
    );
}

function DialogueBox(props: PluginComponentProp) {
    if(!props.appState.textPack){
        return null;
    }
    const{ textPack } = props.appState;
    return renderUtterances(textPack);
}

function getUtterances(textPack: ISinglePack) {
    textPack.annotations.map(ann => ann.span)
}


function enabled(state: State){
    return true;
}

const plugin = {
    name: "DialogueBox",
    component: DialogueBox,
    enabled: enabled,
}

export default plugin;