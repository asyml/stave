import React, { useState } from 'react';
import style from '../styles/Tab.module.css';

type RenderFn = () => JSX.Element;

export interface ITabItem {
  title: string | RenderFn;
  body: RenderFn;
}

export interface TabProp {
  tabs: ITabItem[];
}

export default function Tab({ tabs }: TabProp) {
  const [state, setState] = useState(0);

  return (
    <div className={style.tab_container}>
      <div className={style.tab_header}>
        {tabs.map((tab, i) => {
          const isSelected = i === state;
          return (
            <div
              key={i}
              className={`${style.tab_header_button} ${
                isSelected ? style.tab_header_button_selected : ''
              }`}
              onClick={() => {
                setState(i);
              }}
            >
              {typeof tab.title === 'string' ? tab.title : tab.title()}
            </div>
          );
        })}
      </div>

      <div className={style.tab_body}>
        {tabs[state] ? tabs[state].body() : null}
      </div>
    </div>
  );
}
