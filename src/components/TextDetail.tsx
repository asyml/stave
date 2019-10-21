import React from 'react';
import {
  IColoredLegend,
  IAttributes,
  IOntology,
  IGroup,
} from '../lib/interfaces';
import {
  useTextViewerState,
  useTextViewerDispatch,
} from '../contexts/text-viewer.context';
import Tab from './Tab';
import Attributes from './Attributes';
import LegendList from './LegendList';
import style from '../styles/TextDetail.module.css';

export interface TextDetailProp {
  attributes: IAttributes;
  annotationLegends: IColoredLegend[];
  linkLegends: IColoredLegend[];
  ontology: IOntology;
  groups: IGroup[];
}

export default function TextDetail({
  attributes,
  annotationLegends,
  linkLegends,
  ontology,
  groups,
}: TextDetailProp) {
  const {
    selectedLegendIds,
    selectedLegendAttributeIds,
    selectedGroupId,
    groupEditIsCreating,
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

  const groupList = {
    title: () => (
      <span>
        <span
          className={`
            ${selectedGroupId !== null && style.selected_group_indicator}`}
        ></span>
        group
      </span>
    ),
    body: () => (
      <div className={style.group_name_container}>
        {groups.map(group => {
          const isSelected = selectedGroupId === group.id;
          return (
            <div
              key={group.id}
              className={style.group_name}
              onClick={() => {
                if (isSelected) {
                  dispatch({
                    type: 'deselect-group',
                  });
                } else {
                  dispatch({
                    type: 'select-group',
                    groupId: group.id,
                  });
                }
              }}
            >
              {/* <input type="radio" readOnly checked={isSelected} /> */}
              <span
                className={`${style.check_indicator}
                ${isSelected && style.check_indicator_selected}`}
              ></span>
              {group.id}
            </div>
          );
        })}
        <div style={{ marginTop: 8 }}>
          <button
            onClick={() => {
              if (groupEditIsCreating) {
                dispatch({
                  type: 'cancel-add-group',
                });
              } else {
                dispatch({
                  type: 'start-add-group',
                });
              }
            }}
          >
            {groupEditIsCreating ? 'Cancel add group' : 'Add group'}
          </button>

          {groupEditIsCreating && (
            <div className={style.group_edit_description}>
              click annotation and link to add to group
            </div>
          )}
        </div>
      </div>
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

  return (
    <Tab
      tabs={[legendTabItem, groupList, metadataTabItem]}
      activeTabIndex={0}
    ></Tab>
  );
}
