import React from 'react';
import { IColoredLegend, IOntology } from '../lib/interfaces';
import { Dispatch } from '../contexts/text-viewer.context';
import { attributeId } from '../lib/utils';
import style from '../styles/LegendList.module.css';

interface LegendListProp {
  title: string;
  legends: IColoredLegend[];
  selectedLegendIds: string[];
  selectedLegendAttributeIds: string[];
  ontology: IOntology;
  dispatch: Dispatch;
}

export default function LegendList({
  title,
  legends,
  selectedLegendIds,
  selectedLegendAttributeIds,
  ontology,
  dispatch,
}: LegendListProp) {
  return (
    <div className={style.annotation_legend_container}>
      <h2>{title}</h2>
      <ul className={style.list}>
        {legends.map(legend => {
          const isSelected = selectedLegendIds.indexOf(legend.id) > -1;
          const legendDef = ontology.entryDefinitions.find(
            entryDef => entryDef.entryName === legend.id
          );

          return (
            <li key={legend.id}>
              <div
                className={style.lengend_container}
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
              </div>

              {legendDef && legendDef.attributes ? (
                <div className={style.attribute_name_container}>
                  {legendDef.attributes.map(attr => {
                    const isSelected =
                      selectedLegendAttributeIds.indexOf(
                        attributeId(legend.id, attr.attributeName)
                      ) > -1;

                    return (
                      <div
                        className={style.attribute_name}
                        key={attr.attributeName}
                        onClick={() => {
                          isSelected
                            ? dispatch({
                                type: 'deselect-legend-attribute',
                                legendId: legend.id,
                                attributeId: attr.attributeName,
                              })
                            : dispatch({
                                type: 'select-legend-attribute',
                                legendId: legend.id,
                                attributeId: attr.attributeName,
                              });
                        }}
                      >
                        <input type="radio" readOnly checked={isSelected} />
                        {attr.attributeName}
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
