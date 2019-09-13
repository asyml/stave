import React from 'react';
import { ILegend, IAttributes } from '../lib/interfaces';
import {
  useTextViewerState,
  useTextViewerDispatch
} from '../contexts/text-viewer.context';
import style from '../styles/TextDetail.module.css';
import Tab from './Tab';
import Attributes from './Attributes';

export interface TextDetailProp {
  attributes: IAttributes;
  legends: ILegend[];
}

export default function TextDetail({ attributes, legends }: TextDetailProp) {
  const state = useTextViewerState();
  const dispatch = useTextViewerDispatch();

  const legendTabItem = {
    title: 'legend',
    body: () => (
      <>
        <div className={style.clear_buttons}>
          <button
            onClick={() => {
              dispatch({ type: 'select-all-legend' });
            }}
          >
            select all
          </button>
          <button
            onClick={() => {
              dispatch({ type: 'deselect-all-legend' });
            }}
          >
            clear
          </button>
        </div>
        <ul className={style.list}>
          {legends.map(legend => {
            const isSelected = state.selectedLegendIds.indexOf(legend.id) > -1;

            return (
              <li
                key={legend.id}
                onClick={() => {
                  isSelected
                    ? dispatch({
                        type: 'deselect-legend',
                        legendId: legend.id
                      })
                    : dispatch({
                        type: 'select-legend',
                        legendId: legend.id
                      });
                }}
              >
                <input type="checkbox" readOnly checked={isSelected} />
                <span
                  style={{
                    backgroundColor: legend.color,
                    color: 'white'
                  }}
                >
                  {legend.name}
                </span>
              </li>
            );
          })}
        </ul>
      </>
    )
  };

  const metadataTabItem = {
    title: 'metadata',
    body: () => (
      <div>
        <Attributes attributes={attributes} />
      </div>
    )
  };

  return <Tab tabs={[legendTabItem, metadataTabItem]}></Tab>;
}
