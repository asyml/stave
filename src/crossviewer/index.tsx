import React, {useEffect, useState, } from 'react';



import style from "./styles/TextViewer.module.css";
import TextAreaA from "./components/TextAreaA";
import TextAreaB from "./components/TextAreaB";
import {IAnnotation, ISinglePack,} from '../nlpviewer/lib/interfaces';
import {ICrossDocLink, IMultiPack} from "./components/lib/interfaces";
import ScopeSelector from "../nlpviewer/components/ScopeSelector";
import {inspect} from "util";

export type OnEventType = (event: any) => void;

export interface CrossDocProp {
  textPackA: ISinglePack;
  textPackB: ISinglePack;
  multiPack: IMultiPack;
  onEvent: OnEventType;
  nextCrossDocEnabled : boolean;
}
export const highlight_legend : string = "ft.onto.base_ontology.EntityMention";
export default function CrossViewer(props: CrossDocProp) {

  const {textPackA, textPackB, multiPack, onEvent, nextCrossDocEnabled} = props;
  let annotationsA = textPackA.annotations;
  let annotationsB = textPackB.annotations;
  console.log("wefwef",nextCrossDocEnabled);
  annotationsA.sort(function(a, b){return a.span.begin - b.span.begin});
  annotationsB.sort(function(a, b){return a.span.begin - b.span.begin});

  const all_events_A : IAnnotation[] = annotationsA.filter((entry:IAnnotation)=>entry.legendId == highlight_legend);
  const all_events_B : IAnnotation[] = annotationsB.filter((entry:IAnnotation)=>entry.legendId == highlight_legend);
  textPackA.annotations = all_events_A;
  textPackB.annotations = all_events_B;


  const [AnowOnEventIndex, setANowOnEventIndex] =  useState<number>(0);
  const [BnowOnEventIndex, setBNowOnEventIndex] =  useState<number>(0);
  const [input, setInput] =  useState<string>("");

  const nowAOnEvent : IAnnotation = all_events_A[AnowOnEventIndex];

  // const [selectedText, setSelectedText] =  useState<String | null>(null);
  // function selectText(e:any) {
  //   // @ts-ignore
  //   setSelectedText( window.getSelection().toString());
  // }

  const YesNoEnable: boolean = BnowOnEventIndex < all_events_B.length;
  const nextEventEnable:boolean = AnowOnEventIndex < all_events_A.length-1 && BnowOnEventIndex == all_events_B.length;
  const nextDocEnable: boolean = AnowOnEventIndex == all_events_A.length-1 && BnowOnEventIndex == all_events_B.length && nextCrossDocEnabled;

  function clickNextDocument(){
    onEvent({type:"next-document"});
  }


  function clickNextEvent() {
      setBNowOnEventIndex(0);
      setANowOnEventIndex(AnowOnEventIndex+1);
  }
  function clickYes(){

    const link :ICrossDocLink= {
      id: "null",
      _parent_token: parseInt(annotationsA[AnowOnEventIndex].id),
      _child_token: parseInt(annotationsB[BnowOnEventIndex].id)};
    onEvent({type:"link-add", link:link, input: input});

    setInput("");
    setBNowOnEventIndex(BnowOnEventIndex + 1)
  }
  function clickNo() {
    setInput("");
    setBNowOnEventIndex(BnowOnEventIndex + 1)
  }
  function handleInputChange(evt : any) {
    setInput(evt.target.value);
  }

  return (
      <div className={style.text_viewer}>

        {/*discription here*/}
        <div className={style.tool_bar_container}>
          <div style={{fontSize: "20px"}}>
          Please click on the events on the right pane if the events are coreferential to the event highlighted on the left pane.
          </div>
        </div>


        {/*next event and document*/}
        <div className={style.tool_bar_container}>
          <div>
            <button disabled={!nextEventEnable} onClick={clickNextEvent}
                className={style.next_event_button}
            > Next event
            </button>
            <div className={style.button_action_description}>
              Click only if you have finished this event
            </div>
          </div>

          <div style={{textAlign:"right"}}>
            <button disabled={!nextDocEnable} onClick={clickNextDocument}
                className={style.next_doc_button}
            > Next document
            </button>
            <div className={style.button_action_description}>
              This button is enabled only when all events are finished.
            </div>
          </div>
        </div>


        {/*justify and coref button*/}
        <div className={style.input_bar_container}>
          <div>
            <button disabled={!YesNoEnable} onClick={clickYes}
                    className={style.next_event_button}
            > Yes
            </button>
            <button disabled={!YesNoEnable} onClick={clickNo}
                    className={style.next_event_button}
            > No
            </button>
            <div className={style.button_action_description}>
              Two events corefenrential
            </div>
          </div>

          <textarea
              value = {input}
              onChange={handleInputChange}
              style={{height:"100px", width:"200px"}}
          ></textarea>
        </div>

        {/*<div className={style.tool_bar_container}>*/}
        {/*  <div>*/}
        {/*    <button className={style.evidence_button} onClick={selectText} style={{backgroundColor:"blue"}}>*/}
        {/*      Argument*/}
        {/*    </button>*/}
        {/*  </div>*/}

        {/*  <div>*/}
        {/*    <button className={style.evidence_button} style={{backgroundColor:"red"}}>*/}
        {/*      Locaition*/}
        {/*    </button>*/}

        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <button className={style.evidence_button} style={{backgroundColor:"green"}}>*/}
        {/*      Temperal*/}
        {/*    </button>*/}

        {/*  </div>*/}
        {/*  <div>*/}
        {/*    <button className={style.evidence_button} style={{backgroundColor:"yellow"}}>*/}
        {/*      Number*/}
        {/*    </button>*/}

        {/*  </div>*/}
        {/*</div>*/}

        <main className={style.layout_container}>

          <div
              className={`${style.center_area_container}`}
          >

            <div className={`${style.text_area_container}`}>
              <TextAreaA
                  textPack={textPackA}
                  nowOnEventIndex={AnowOnEventIndex}
                  // selectedText = {selectedText}
              />
            </div>
          </div>

          <div
              className={`${style.center_area_container}`}
          >
            <div className={`${style.text_area_container}`}>
              <TextAreaB
                  textPack={textPackB}
                  nowOnEventIndex = {BnowOnEventIndex}
                  multiPack={multiPack}
              />
            </div>
          </div>


        </main>
      </div>
  );
}

