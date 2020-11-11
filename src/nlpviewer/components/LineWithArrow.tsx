import React from 'react';
import { IPos } from '../lib/interfaces';
import style from '../styles/LineWithArrow.module.css';

export interface LineWithArrowProp {
  fromPos: IPos;
  toPos: IPos;
}

export default function LineWithArrow({ fromPos, toPos }: LineWithArrowProp) {
  const x = fromPos.x;
  const y = fromPos.y;

  const width = toPos.x - x;
  const height = toPos.y - y;

  let rotate = (Math.atan(height / width) * 180) / Math.PI;
  if (width === 0) {
    if (height > 0) {
      rotate = -90;
    } else {
      rotate = 90;
    }
  } else if (width < 0) {
    if (height > 0) {
      rotate += 180;
    } else {
      rotate -= 180;
    }
  }

  return (
    <div
      className={style.link_edit_connector}
      style={{
        position: 'absolute',
        top: y,
        left: x,
        transformOrigin: '0 0',
        transform: `rotate(${rotate}deg)`,
        width: Math.sqrt(width * width + height * height) - 2,
        height: 1,
      }}
    >
      <span className={style.link_drag_arrow}></span>
    </div>
  );
}
