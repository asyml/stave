import React from 'react';
import { IColoredLegend, IAttributes } from '../lib/interfaces';
import {
  useTextViewerState,
  useTextViewerDispatch,
} from '../contexts/text-viewer.context';
import style from '../styles/TextDetail.module.css';
import Tab from './Tab';
import Attributes from './Attributes';

export interface TextDetailProp {
  attributes: IAttributes;
  annotationLegends: IColoredLegend[];
  linkLegends: IColoredLegend[];
}

export default function TextDetail({
  attributes,
  annotationLegends,
  linkLegends,
}: TextDetailProp) {
  const state = useTextViewerState();
  const dispatch = useTextViewerDispatch();

  const legendTabItem = {
    title: 'legend',
    body: () => (
      <>
        <div className="annotation-legend-container">
          <h3>Annotations</h3>
          <ul className={style.list}>
            {annotationLegends.map(legend => {
              const isSelected =
                state.selectedLegendIds.indexOf(legend.id) > -1;

              return (
                <li
                  key={legend.id}
                  onClick={() => {
                    isSelected
                      ? dispatch({
                          type: 'deselect-legend',
                          legendId: legend.id,
                        })
                      : dispatch({
                          type: 'select-legend',
                          legendId: legend.id,
                        });
                  }}
                >
                  <input type="checkbox" readOnly checked={isSelected} />
                  <span
                    style={{
                      backgroundColor: legend.color,
                      color: 'white',
                    }}
                  >
                    {legend.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="annotation-legend-container">
          <h3>Links</h3>
          <ul className={style.list}>
            {linkLegends.map(legend => {
              const isSelected =
                state.selectedLegendIds.indexOf(legend.id) > -1;

              return (
                <li
                  key={legend.id}
                  onClick={() => {
                    isSelected
                      ? dispatch({
                          type: 'deselect-legend',
                          legendId: legend.id,
                        })
                      : dispatch({
                          type: 'select-legend',
                          legendId: legend.id,
                        });
                  }}
                >
                  <input type="checkbox" readOnly checked={isSelected} />
                  <span
                    style={{
                      backgroundColor: legend.color,
                      color: 'white',
                    }}
                  >
                    {legend.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </>
    ),
  };

  const metadataTabItem = {
    title: 'metadata',
    body: () => (
      <div>
        <Attributes attributes={attributes} />
      </div>
    ),
  };

  return <Tab tabs={[legendTabItem, metadataTabItem]}></Tab>;
}
