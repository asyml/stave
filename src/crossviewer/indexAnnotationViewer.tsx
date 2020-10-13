import React, {useState, } from 'react';
import ReactModal from 'react-modal';

import style from "./styles/TextViewer.module.css";
import TextAreaA from "./components/TextAreaA";
import TextAreaB from "./components/TextAreaB";

// @ts-ignore
import Progress from 'react-progressbar';
import {IAnnotation, ISinglePack,} from '../nlpviewer/lib/interfaces';
import {
  IMultiPack, IMultiPackQuestion,
} from "./components/lib/interfaces";
import {cross_doc_event_legend} from "./components/lib/definitions";
// @ts-ignore
import { useAlert } from 'react-alert'
import Select from 'react-select';
import {useHistory} from "react-router";

export type OnEventType = (event: any) => void;

export interface CrossDocProp {
  textPackA: ISinglePack;
  textPackB: ISinglePack;
  multiPack: IMultiPack;
  multiPackQuestion:  IMultiPackQuestion;
  onEvent: OnEventType;
  nextID: string;
  secretCode: string;
}
export default function IndexAnnotationViewer(props: CrossDocProp) {

  const history = useHistory();

  const {textPackA, textPackB, multiPack, multiPackQuestion, onEvent, nextID, secretCode} = props;


  // @ts-ignore
  const options = multiPack.creation_records.map((record) => ({
    value: record.forteID,
    label: record.forteID,
  }));

  const [selectedForteID, setSelectedForteID] =  useState(options[0]);

  // @ts-ignore
  const my_annotation = multiPack.creation_records.find(ele => ele.forteID===selectedForteID.value).records;
  let annotationsA = textPackA.annotations;
  let annotationsB = textPackB.annotations;
  annotationsA.sort(function(a, b){return a.span.begin - b.span.begin});
  annotationsB.sort(function(a, b){return a.span.begin - b.span.begin});

  const all_events_A : IAnnotation[] = annotationsA.filter((entry:IAnnotation)=>entry.legendId === cross_doc_event_legend);
  const all_events_B : IAnnotation[] = annotationsB.filter((entry:IAnnotation)=> entry.legendId === cross_doc_event_legend);
  // textPackA.annotations = all_events_A;
  // textPackB.annotations = all_events_B;


  const [AnowOnEventIndex, setANowOnEventIndex] =  useState<number>(0);
  const nowAOnEvent = all_events_A[AnowOnEventIndex];





  // @ts-ignore
  const BSelectedIndex = multiPack.crossDocLink.filter(item => item._parent_token === +nowAOnEvent.id && item.coref==="coref" && my_annotation.includes(item.id))
            .map(item => item._child_token)
            .map(event_id => all_events_B.findIndex(event => +event.id===event_id));



  const BackEnable: boolean =  AnowOnEventIndex > 0;
  const nextEventEnable:boolean = AnowOnEventIndex < all_events_A.length;
  const progress_percent = Math.floor(AnowOnEventIndex / all_events_A.length * 100);

  const [finished, setFinished] = useState<boolean>(false);


  const alert = useAlert();

  const customStyles = {
    // @ts-ignore
    option: (provided, state) => ({
      ...provided,
      borderBottom: '2px dotted green',
      color: state.isSelected ? 'yellow' : 'black',
      backgroundColor: state.isSelected ? 'green' : 'white',
    }),
    // @ts-ignore
    control: (provided) => ({
      ...provided,
      marginTop: "5%",
    })
  };



  function clickNextEvent() {

    if (AnowOnEventIndex === all_events_A.length-1) {
      if (nextID !== "None"){
        history.push('/crossdocs/'+nextID);
      }
      else {
        setFinished(true);
      }
    } else {
      setANowOnEventIndex(AnowOnEventIndex + 1);
    }

  }

  function clickBack() {
    setANowOnEventIndex(AnowOnEventIndex-1);
  }


  // this function is triggered when any event is clicked
  function eventClickCallBack(eventIndex:number, selected:boolean){
    return
  }
  function handleForteIDChange(newForteID : any) {
    setSelectedForteID(newForteID)
  }



  return (
      <div>
        <ReactModal isOpen={finished} className={style.modal} overlayClassName={style.modal_overlay}>You have finished. Secret code is {secretCode}</ReactModal>
      <div className={style.text_viewer}>
        {/*discription here*/}
        <div className={style.tool_bar_container}>
          <div className={style.spread_flex_container}>
            <div>You are in a view-only mode</div>
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
            <label><Progress completed={progress_percent} />Progress: {progress_percent}%</label>
            {/*<div className={style.button_action_description}>*/}
            {/*  Click next event only if you have finished this event*/}
            {/*</div>*/}

          </div>
          <div style={{width:"500px", marginTop:"-5em"}}>
          <Select styles={customStyles} options={options} onChange={handleForteIDChange}  value={selectedForteID}/>
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
                  NER={[]}
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
                  NER = {[]}
                  AnowOnEventIndex={AnowOnEventIndex}
                  BnowOnEventIndex={-1}
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

