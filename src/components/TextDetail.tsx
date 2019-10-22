import React from 'react';
import { IColoredLegend, IAttributes, IOntology } from '../lib/interfaces';
import {
  useTextViewerState,
  useTextViewerDispatch,
} from '../contexts/text-viewer.context';
import Tab from './Tab';
import Attributes from './Attributes';
import LegendList from './LegendList';

export interface TextDetailProp {
  attributes: IAttributes;
  annotationLegends: IColoredLegend[];
  linkLegends: IColoredLegend[];
  groupLegends: IColoredLegend[];
  ontology: IOntology;
}

export default function TextDetail({
  attributes,
  annotationLegends,
  linkLegends,
  groupLegends,
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
          title="Annotation Legends"
          legends={annotationLegends}
          selectedLegendIds={selectedLegendIds}
          selectedLegendAttributeIds={selectedLegendAttributeIds}
          ontology={ontology}
          dispatch={dispatch}
        />

        <LegendList
          title="Link Legends"
          legends={linkLegends}
          selectedLegendIds={selectedLegendIds}
          selectedLegendAttributeIds={selectedLegendAttributeIds}
          ontology={ontology}
          dispatch={dispatch}
        />

        <LegendList
          title="Group Legends"
          legends={groupLegends}
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

  return <Tab tabs={[legendTabItem, metadataTabItem]} activeTabIndex={0}></Tab>;
}
