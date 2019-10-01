import React from 'react';
import { IColoredLegend, IAttributes, IOntology } from '../lib/interfaces';
import {
  useTextViewerState,
  useTextViewerDispatch,
  Dispatch,
} from '../contexts/text-viewer.context';
import { attributeId } from '../lib/utils';
import style from '../styles/TextDetail.module.css';
import Tab from './Tab';
import Attributes from './Attributes';

export interface TextDetailProp {
  attributes: IAttributes;
  annotationLegends: IColoredLegend[];
  linkLegends: IColoredLegend[];
  ontology: IOntology;
}

export default function TextDetail({
  attributes,
  annotationLegends,
  linkLegends,
  ontology,
}: TextDetailProp) {
  const {
    selectedLegendIds,
    selectedLegendAttributeIds,
  } = useTextViewerState();
  const dispatch = useTextViewerDispatch();

  const legendTabItem = {
    title: 'legend',
    body: () => (
      <>
        <LegendList
          title="Annotations"
          legends={annotationLegends}
          selectedLegendIds={selectedLegendIds}
          selectedLegendAttributeIds={selectedLegendAttributeIds}
          ontology={ontology}
          dispatch={dispatch}
        />

        <LegendList
          title="Links"
          legends={linkLegends}
          selectedLegendIds={selectedLegendIds}
          selectedLegendAttributeIds={selectedLegendAttributeIds}
          ontology={ontology}
          dispatch={dispatch}
        />
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

interface LegendListProp {
  title: string;
  legends: IColoredLegend[];
  selectedLegendIds: string[];
  selectedLegendAttributeIds: string[];
  ontology: IOntology;
  dispatch: Dispatch;
}

function LegendList({
  title,
  legends,
  selectedLegendIds,
  selectedLegendAttributeIds,
  ontology,
  dispatch,
}: LegendListProp) {
  return (
    <div className="annotation-legend-container">
      <h3>{title}</h3>
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
                        <input type="checkbox" readOnly checked={isSelected} />
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
