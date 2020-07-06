import React, {useState} from 'react';
import {
  State, 
  IAnnotation, 
  ISinglePack, 
  transformBackAnnotation,
  transformPack,
} from "../../nlpviewer"
import {PluginComponentProp} from "../lib/interface"
import style from "./DialogueBox.module.css"
import TextInput from "./TextInput"
import { useParams } from 'react-router-dom';
import {
  editText,
  addAnnotation,
  loadNlpModel,
  runNlp,
} from '../../app/lib/api';

function Utterance(text: string, annotation: IAnnotation){
  if (annotation.attributes.speaker === 'ai'){
    return <div className={style.bubble_container} key={'utterance_container_' + annotation.id}> 
      <div className={style.bubble_left} key={'utterance_bubble_' + annotation.id}>    
        <div key={'utterance_' + annotation.id}>
          {text.substring(annotation.span.begin, annotation.span.end)}
        </div>
      </div>
    </div>
  }else if (annotation.attributes.speaker === 'user'){
    return <div className={style.bubble_container} key={'utterance_container_' + annotation.id}>        
      <div className={style.bubble_right} key={'utterance_bubble_' + annotation.id}>    
        <div key={'utterance_' + annotation.id}>
          {text.substring(annotation.span.begin, annotation.span.end)}
        </div>
      </div>
    </div>
  } else{
    return  <div className={style.bubble_container} key={'utterance_container_' + annotation.id}>        
    <div className={style.bubble_right} key={'utterance_bubble_' + annotation.id}>    
      ...
    </div>
    </div>
  }
}

function DialogueBox(props: PluginComponentProp) {
  let { id } = useParams();

  // Avoid confusion between doc_id and annotation id.
  const doc_id = id;
  
  const [pack, setPack] = useState<ISinglePack | null> (props.appState.textPack);

  if(!pack){
    return null;
  }

  let {annotations, text} = pack;

  const utterances = annotations.filter(
    (ann) => {
      // TODO: This did not read the class hierarchy.
      return ann.legendId === "ft.onto.base_ontology.Utterance"
    }
  );

  var model_ok = false
  const model_name = 'content_rewriter'

  // Call API to load the NLP model of name "model_name".
  loadNlpModel(model_name).then(() =>{
    model_ok = true
  });

  console.log(model_ok);

  return (        
    <div key = 'plugin-dialogue-box'>
      <div key='dialogue-utterances-container'>
        { utterances.map((ann, i) =>{
          return Utterance(text, ann);
        })}            
      </div>        
      <div key='dialogue-text-input'>
        <TextInput textValue='enter text here' textPack={pack} onEvent={event => {
          if (event.type === 'new-utterance'){
            const {type, text, ...annotation} = event;
            const annotationAPIData = transformBackAnnotation(annotation);

            editText(doc_id, text).then(() =>{
              addAnnotation(doc_id, annotationAPIData).then(({ id }) => {
                // Update the pack after set the text then the annotation.
                annotation.id = id;
                setPack({                              
                  ...pack,
                  text: text,
                  annotations: [...pack.annotations, annotation],
                });
                runNlp(doc_id, model_name).then(data => {
                  const [singlePackFromAPI, ontologyFromAPI] = transformPack(
                    data.textPack,
                    data.ontology
                  );        
                  setPack({
                    ...singlePackFromAPI
                  })
                });            
              });    
            });

          }
        }}></TextInput>
      </div>
    </div>
  );
}

function enabled(state: State){
  return true;
}

const plugin = {
  name: "DialogueBox",
  component: DialogueBox,
  enabled: enabled,
}

export type OnEventType = (event: any) => void;
export default plugin;