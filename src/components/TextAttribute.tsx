import React from 'react';
import { IMetadata, ILegend } from '../lib/interfaces';
import { lightenDarkenColor } from '../lib/color';
import {
  useTextViewerState,
  useTextViewerDispatch
} from '../contexts/text-viewer.context';
import style from '../styles/TextAttribute.module.css';
import Tab from './Tab';

export interface TextAttributeProp {
  metadata: IMetadata;
  legends: ILegend[];
}

export default function TextAttribute({
  metadata,
  legends
}: TextAttributeProp) {
  const state = useTextViewerState();
  const dispatch = useTextViewerDispatch();

  const legendTabItem = {
    title: 'legend',
    body: () => (
      <>
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
          clear all
        </button>
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
                    backgroundColor: lightenDarkenColor(legend.color, 10),
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
        {Object.keys(metadata).map(key => (
          <div className={style.metadata} key={key}>
            <div className={style.metadata_name}>{key}</div>
            <div className={style.metadata_value}>{metadata[key]}</div>
          </div>
        ))}
      </div>
    )
  };

  return <Tab tabs={[legendTabItem, metadataTabItem]}></Tab>;
}
