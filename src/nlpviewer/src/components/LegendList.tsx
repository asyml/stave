import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Dispatch} from '../contexts/text-viewer.context';
import {IEntryDefinition} from '../lib/interfaces';
import {attributeId} from '../lib/utils';
import style from '../styles/LegendList.module.css';

interface LegendListProp {
  legends: (IEntryDefinition & {color: string})[];
  selectedLegendIds: string[];
  selectedLegendAttributeIds: string[];
  dispatch: Dispatch;
}

export default function LegendList({
  legends,
  selectedLegendIds,
  selectedLegendAttributeIds,
  dispatch,
}: LegendListProp) {
  return (
    <div className={style.annotation_legend_container}>
      <ul className={style.list}>
        {legends.map((legend, i) => {
          const isSelected = selectedLegendIds.indexOf(legend.entryName) > -1;

          return (
            <li key={legend.entryName + i}>
              <div
                className={style.lengend_container}
                onClick={() => {
                  isSelected
                    ? dispatch({
                        type: 'deselect-legend',
                        legendId: legend.entryName,
                      })
                    : dispatch({
                        type: 'select-legend',
                        legendId: legend.entryName,
                      });
                }}
              >
                <input type="checkbox" readOnly checked={isSelected} />
                <div
                  style={{
                    backgroundColor: legend.color,
                    color: '#595959',
                    fontWeight: 500,
                    padding: '5px',
                    marginLeft: '10px',
                    minWidth: '193px',
                    borderTopLeftRadius: '6px',
                    borderBottomLeftRadius: '6px',
                    fontSize: '16px',
                  }}
                >
                  {legend.entryName.split('.').pop()}
                </div>
                <div
                  style={{
                    position: 'relative',
                    right: 40,
                    top: 2,
                  }}
                >
                  <IconButton aria-label="More">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>

              {legend.attributes ? (
                <div className={style.attribute_name_container}>
                  {legend.attributes.map(attr => {
                    const isSelected =
                      selectedLegendAttributeIds.indexOf(
                        attributeId(legend.entryName, attr.name)
                      ) > -1;

                    return (
                      <div
                        className={style.attribute_name}
                        key={attr.name}
                        onClick={() => {
                          isSelected
                            ? dispatch({
                                type: 'deselect-legend-attribute',
                                legendId: legend.entryName,
                                attributeId: attr.name,
                              })
                            : dispatch({
                                type: 'select-legend-attribute',
                                legendId: legend.entryName,
                                attributeId: attr.name,
                              });
                        }}
                      >
                        <input type="radio" readOnly checked={isSelected} />
                        {attr.name}
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
