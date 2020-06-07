import React, {useEffect, useState, } from 'react';
import ReactModal from 'react-modal';

import style from "./styles/TextViewer.module.css";
import TextAreaA from "./components/TextAreaA";
import TextAreaB from "./components/TextAreaB";
import {IAnnotation, ISinglePack,} from '../nlpviewer/lib/interfaces';
import {
  ICrossDocLink,
  IMultiPack, IMultiPackQuestion,
} from "./components/lib/interfaces";
import {cross_doc_event_legend} from "./components/lib/definitions";

export type OnEventType = (event: any) => void;

export interface CrossDocProp {
  textPackA: ISinglePack;
  textPackB: ISinglePack;
  multiPack: IMultiPack;
  multiPackQuestion:  IMultiPackQuestion;
  onEvent: OnEventType;
}
export default function CrossViewer(props: CrossDocProp) {

  const {textPackA, textPackB, multiPack, multiPackQuestion, onEvent} = props;
  let annotationsA = textPackA.annotations;
  let annotationsB = textPackB.annotations;
  annotationsA.sort(function(a, b){return a.span.begin - b.span.begin});
  annotationsB.sort(function(a, b){return a.span.begin - b.span.begin});

  const all_events_A : IAnnotation[] = annotationsA.filter((entry:IAnnotation)=>entry.legendId == cross_doc_event_legend);
  const all_events_B : IAnnotation[] = annotationsB.filter((entry:IAnnotation)=>entry.legendId == cross_doc_event_legend);
  textPackA.annotations = all_events_A;
  textPackB.annotations = all_events_B;


  const [AnowOnEventIndex, setANowOnEventIndex] =  useState<number>(0);
  const [BnowOnEventIndex, setBNowOnEventIndex] =  useState<number>(-1);
  const nowAOnEvent = all_events_A[AnowOnEventIndex];
  const nowBOnEvent = BnowOnEventIndex >= 0 ? all_events_B[BnowOnEventIndex] : undefined;

  const [nowQuestionIndex, setNowQuestionIndex] =  useState<number>(-1);
  const now_question = nowQuestionIndex >=0 ? multiPackQuestion.coref_questions[nowQuestionIndex] : undefined;

  const [currentAnswers, setCurrentAnswers] = useState<number []>([]);

  const [instructionOpen, setInstructionOpen] = useState<boolean>(false);


  const BSelectedIndex = multiPack.crossDocLink.filter(item => item._parent_token === +nowAOnEvent.id)
            .map(item => item._child_token)
            .map(event_id => all_events_B.findIndex(event => +event.id===event_id));

  // const options = [
  //   { value: 'location', label: 'location' },
  //   { value: 'time', label: 'time' },
  //   { value: 'argument', label: 'argument' }
  // ];


  const BackEnable: boolean =  AnowOnEventIndex > 0;
  const nextEventEnable:boolean = AnowOnEventIndex < all_events_A.length-1 ;


  function constructNewLink(whetherCoref:boolean, new_answers:number[]) : ICrossDocLink {
    const newLink :ICrossDocLink= {
      id: undefined,
      _parent_token: +nowAOnEvent.id,
      _child_token: +all_events_B[BnowOnEventIndex].id,
      coref: whetherCoref,
      answers: new_answers.map((option_id, index) => ({
        question_id: multiPackQuestion.coref_questions[index].question_id,
        option_id: option_id
      }))};
    return newLink;

  }

  function clickViewInstruction(){
    setInstructionOpen(true);
    return false;
  }
  function clickAnywhere(){
    if (instructionOpen) {
      setInstructionOpen(false);
    }
    return false;
  }

  function clickNextEvent() {
    setANowOnEventIndex(AnowOnEventIndex+1);
  }

  function clickBack() {
    setANowOnEventIndex(AnowOnEventIndex-1);
  }
  function clickOption(option_id:number) {
    if (option_id == -1) {
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

  function eventClickCallBack(eventIndex:number, selected:boolean){
    if (BnowOnEventIndex>=0) {
      return
    }
    if (selected) {
      setBNowOnEventIndex(eventIndex);
      setNowQuestionIndex(0);

    } else {
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
      <div onClick={clickAnywhere}>
        <ReactModal isOpen={instructionOpen} className={style.modal} overlayClassName={style.modal_overlay}>haha</ReactModal>
      <div className={style.text_viewer}>
        {/*discription here*/}
        <div className={style.tool_bar_container}>
          <div className={style.spread_flex_container}>
            <button onClick={clickViewInstruction}
                    className={style.button_view_instruction}>
              View Instructions
            </button>
            <button onClick={clickViewInstruction}
                    className={style.button_view_instruction}>
              View Annotations
            </button>
          </div>
        </div>


        {/*next event and document*/}
        <div className={style.tool_bar_container}>
          <div>
            <button disabled={!BackEnable} onClick={clickBack}
                    className={style.button_next_event}>
              Back
            </button>
            <button disabled={!nextEventEnable} onClick={clickNextEvent}
                    className={style.button_next_event}
            > Next event
            </button>

            <div className={style.button_action_description}>
              Click next event only if you have finished this event
            </div>
          </div>
        </div>


        <main className={style.layout_container}>

          <div
              className={`${style.center_area_container}`}
          >

            <div className={`${style.text_area_container}`}>
              <TextAreaA
                  textPack={textPackA}
                  AnowOnEventIndex={AnowOnEventIndex}
              />
            </div>
          </div>

          <div
              className={`${style.center_area_container}`}
          >
            <div className={`${style.text_area_container}`}>
              <TextAreaB
                  textPack={textPackB}
                  AnowOnEventIndex={AnowOnEventIndex}
                  BnowOnEventIndex={BnowOnEventIndex}
                  BSelectedIndex={BSelectedIndex}
                  eventClickCallBack={eventClickCallBack}
              />
            </div>
          </div>


        </main>
        <div className={style.bottom_box}>
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
            <button className={style.button_option_alert}onClick={e => clickOption(-1)}>I don't think they are coreferential anymore.</button>
          </div>
          : null}
        </div>
      </div>
      </div>
  );
}

