import React, { useState } from 'react';
import style from '../styles/Tab.module.css';

export interface ITabItem {
  title: string;
  body: () => JSX.Element;
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
              {tab.title}
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
