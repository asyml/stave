import React, {useRef, useEffect, useMemo, useState} from 'react';
import style from '../styles/CrossDocStyle.module.css';
import {IAnnotation} from "../../nlpviewer";

export interface EventProp {
    eventIndex: number;
    eventText: String;
    AnowOnEventIndex: number;
    initSelected: number;
    eventClickCallBack: any;
}


function Event({eventIndex, eventText, AnowOnEventIndex, initSelected,eventClickCallBack}: EventProp) {
    const [selected, setSelected] = useState<number>(initSelected);
    const [hovered, setHovered] = useState<boolean>(false);
    useEffect(()=> {
        setSelected(initSelected);
    }, [AnowOnEventIndex, initSelected, eventClickCallBack]);

    function mouseOn() {
        setHovered(true);
    }
    function mouseOff() {
        setHovered(false);
    }
    function onClick(e: any) {
        eventClickCallBack(eventIndex, !selected);
        return false;
    }

    let eventStyle = "";
    if (selected == 0 && !hovered) {
        eventStyle = style.event_not_selected;
    } else if (selected == 0 && hovered) {
        eventStyle = style.event_not_selected_hovered;
    } else if (selected == 1) {
        eventStyle = style.event_now_on;
    } else if (selected == 2 && !hovered) {
        eventStyle = style.event_selected;
    } else if (selected == 2 && hovered) {
        eventStyle = style.event_selected_hovered;
    }

    return (
        <span className={eventStyle} onMouseEnter={mouseOn} onMouseLeave={mouseOff}
              onClick={e => onClick(e)}>
            {eventText}
        </span>
    );
}



export default Event;
