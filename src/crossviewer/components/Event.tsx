import React, {useRef, useEffect, useMemo, useState} from 'react';
import style from '../styles/CrossDocStyle.module.css';
import {IAnnotation} from "../../nlpviewer";




export interface EventProp {
    eventText: String;
  nowOnEvent: IAnnotation
}


function Event({ eventText, nowOnEvent,}: EventProp) {
    const [selected, setSeletected] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);

    useEffect(()=>{
        setSeletected(false);
        setHovered(false);
    },[nowOnEvent]);
    function mouseOn() {
        setHovered(true);
    }
    function mouseOff() {
        setHovered(false);
    }
    function onClick(e: any) {
        setSeletected(!selected);
        return false;
    }

    let eventStyle = "";
    if (!selected && !hovered) {
        eventStyle = style.event_not_selected;
    } else if (!selected && hovered) {
        eventStyle = style.event_not_selected_hovered;
    } else if (selected && !hovered) {
        eventStyle = style.event_selected;
    } else if (selected && hovered) {
        eventStyle = style.event_selected_hovered;
    }

    return (
        <span className={eventStyle} onMouseEnter={mouseOn} onMouseLeave={mouseOff} onClick={onClick}>{eventText}</span>
    );
}



export default Event;
