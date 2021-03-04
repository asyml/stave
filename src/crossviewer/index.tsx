import React, {useEffect, useState, } from 'react';
// @ts-ignore
import ReactModal from 'react-modal';
import style from "./styles/TextViewer.module.css";
import TextAreaA from "./components/TextAreaA";
import TextAreaB from "./components/TextAreaB";

// @ts-ignore
import { LinearProgress } from '@material-ui/core';
import {IAnnotation, ISinglePack,} from '../nlpviewer/lib/interfaces';
import {
  ICrossDocLink,
  IMultiPack, IMultiPackQuestion,
} from "./lib/interfaces";
import {cross_doc_event_legend, ner_legend} from "./lib/definitions";
// @ts-ignore
import { useAlert } from 'react-alert'
import {useHistory} from "react-router";

export * from './lib/interfaces';
export * from './lib/utils';

export type OnEventType = (event: any) => void;

export interface CrossDocProp {
  textPackA: ISinglePack;
  textPackB: ISinglePack;
  multiPack: IMultiPack;
  multiPackQuestion:  IMultiPackQuestion;
  onEvent: OnEventType;

}
export default function CrossViewer(props: CrossDocProp) {

  const history = useHistory();

  const {textPackA, textPackB, multiPack, multiPackQuestion, onEvent} = props;


  let annotationsA = textPackA.annotations;
  let annotationsB = textPackB.annotations;
  annotationsA.sort(function(a, b){return a.span.begin - b.span.begin});
  annotationsB.sort(function(a, b){return a.span.begin - b.span.begin});

  const all_events_A : IAnnotation[] = annotationsA.filter((entry:IAnnotation)=>entry.legendId === cross_doc_event_legend);
  const all_events_B : IAnnotation[] = annotationsB.filter((entry:IAnnotation)=>entry.legendId === cross_doc_event_legend);
  const all_NER_A : IAnnotation[] = annotationsA.filter((entry:IAnnotation)=>entry.legendId === ner_legend);
  const all_NER_B : IAnnotation[] = annotationsB.filter((entry:IAnnotation)=>entry.legendId === ner_legend);
  // textPackA.annotations = all_events_A;
  // textPackB.annotations = all_events_B;


  const [AnowOnEventIndex, setANowOnEventIndex] =  useState<number>(0);
  const [BnowOnEventIndex, setBNowOnEventIndex] =  useState<number>(-1);
  const nowAOnEvent = all_events_A[AnowOnEventIndex];

  const [nowQuestionIndex, setNowQuestionIndex] =  useState<number>(-1);
  const now_question = nowQuestionIndex >=0 ? multiPackQuestion.coref_questions[nowQuestionIndex] : undefined;
  const [currentAnswers, setCurrentAnswers] = useState<number []>([]);


  let dynamic_instruction = "";
  if (BnowOnEventIndex===-1){
    dynamic_instruction = "Click events on the right if they are coreferential to the left event. Or click next event if there is no more."
  } else if (nowQuestionIndex !== -1) {
    dynamic_instruction = "Answer why you think these two events are coreferential."
  }

  const BSelectedIndex = multiPack.crossDocLink.filter(item => item._parent_token === +nowAOnEvent.id && item.coref==="coref")
    .map(item => item._child_token)
    .map(event_id => all_events_B.findIndex(event => +event.id===event_id));



  const BackEnable: boolean =  AnowOnEventIndex > 0 && BnowOnEventIndex === -1;
  const nextEventEnable:boolean = AnowOnEventIndex < all_events_A.length - 1 && BnowOnEventIndex === -1;
  const progress_percent = Math.floor(AnowOnEventIndex / all_events_A.length * 100);

  const alert = useAlert();

  function constructNewLink(whetherCoref:boolean, new_answers:number[]) : ICrossDocLink {
    const newLink :ICrossDocLink= {
      id: undefined,
      _parent_token: +nowAOnEvent.id,
      _child_token: +all_events_B[BnowOnEventIndex].id,
      coref: whetherCoref? "coref" : "not-coref",
      coref_answers: new_answers.map((option_id, index) => ({
        question_id: multiPackQuestion.coref_questions[index].question_id,
        option_id: option_id
      })),
    };
    return newLink;
  }

  function clickNextEvent() {
    // no effect when we are asking questions
    if (now_question || AnowOnEventIndex === all_events_A.length-1) {
      return
    }
    resetBAndQuestions();
    setANowOnEventIndex(AnowOnEventIndex + 1);

  }

  function clickBack() {
    // no effect when we are asking questions
    if (now_question) {
      return
    }
    setANowOnEventIndex(AnowOnEventIndex-1);
    resetBAndQuestions();
  }
  function clickOption(option_id:number) {
    if (option_id === -1) {
      resetBAndQuestions();
      return;
    }
    let new_answers = [...currentAnswers];
    new_answers.push(option_id);
    if (nowQuestionIndex < multiPackQuestion.coref_questions.length-1){
      setNowQuestionIndex(nowQuestionIndex+1);
      setCurrentAnswers(new_answers);
    } else {
      const newLink = constructNewLink(true, new_answers);
      onEvent({
        type:"link-add",
        newLink: newLink,
      });
      resetBAndQuestions();
    }
  }

  // this function is triggered when any event is clicked
  function eventClickCallBack(eventIndex:number, selected:boolean){
    if (BnowOnEventIndex>=0) {
      return
    }
    if (selected) {
      // if there is no questions, directly send this link to server
      if (multiPackQuestion.coref_questions.length === 0) {
        const newLink = constructNewLink(true, []);
        onEvent({
          type:"link-add",
          newLink: newLink,
        });
        return
      }

      //else start to ask questions
      setBNowOnEventIndex(eventIndex);
      setNowQuestionIndex(0);

    } else {
      if (!window.confirm("Are you sure you wish to delete this pair?")) return;
      // @ts-ignore
      const linkID = multiPack.crossDocLink.find(item => item._parent_token === +nowAOnEvent.id && item._child_token === +all_events_B[eventIndex].id).id;
      onEvent({
        type: "link-delete",
        linkID: linkID,
      });
    }
    return
  }

  function resetBAndQuestions() {
    setBNowOnEventIndex(-1);
    setNowQuestionIndex(-1);
    setCurrentAnswers([]);
  }


  return (
    <div>
      <div className={style.text_viewer}>
        {/*discription here*/}
        <div className={style.tool_bar_container}>
          <div className={style.spread_flex_container}>
            <div>{dynamic_instruction}</div>
          </div>
        </div>


        {/*next event and document*/}
        <div className={style.second_tool_bar_container}>
          <div>
            <button disabled={!BackEnable} onClick={clickBack}
                    className={style.button_next_event}>
              Back
            </button>
            <button disabled={!nextEventEnable} onClick={clickNextEvent}
                    className={style.button_next_event}
            > Next event
            </button>
            <label><LinearProgress value={progress_percent} variant="determinate" /> Progress: {progress_percent}%</label>
            {/*<div className={style.button_action_description}>*/}
            {/*  Click next event only if you have finished this event*/}
            {/*</div>*/}
          </div>
          <div className={style.answer_box}>
            {now_question ?
              <div>
                <div className={style.question_container}>
                  {now_question.question_text}
                </div>
                <div className={style.option_container}>
                  {now_question.options.map(option => {
                    return (
                      <button className={style.button_option} key={option.option_id} onClick={e => clickOption(option.option_id)}>
                        {option.option_text}
                      </button>
                    )
                  })}
                </div>
                <button className={style.button_option_alert}onClick={e => clickOption(-1)}>Cancel</button>
              </div>
              : null}
          </div>
        </div>


        <main className={style.layout_container}>

          <div
            className={`${style.center_area_container}`}
          >

            <div className={`${style.text_area_container}`}>
              <TextAreaA
                text = {textPackA.text}
                annotations={all_events_A}
                NER = {all_NER_A}
                AnowOnEventIndex={AnowOnEventIndex}
              />
            </div>
          </div>

          <div
            className={`${style.center_area_container}`}
          >
            <div className={`${style.text_area_container}`}>
              <TextAreaB
                text = {textPackB.text}
                annotations={all_events_B}
                NER = {all_NER_B}
                AnowOnEventIndex={AnowOnEventIndex}
                BnowOnEventIndex={BnowOnEventIndex}
                BSelectedIndex={BSelectedIndex}
                eventClickCallBack={eventClickCallBack}
              />
            </div>
          </div>


        </main>
      </div>
    </div>
  );
}


