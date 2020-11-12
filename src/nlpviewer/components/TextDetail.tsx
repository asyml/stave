import React from 'react';
import {IEntryDefinition, IAttributes} from '../lib/interfaces';
import {
  useTextViewerState,
  useTextViewerDispatch,
} from '../contexts/text-viewer.context';
import Tab from './Tab';
import Attributes from './Attributes';
import LegendList from './LegendList';

export interface TextDetailProp {
  attributes: IAttributes;
  annotationLegends: (IEntryDefinition & {color: string})[];
  linkLegends: (IEntryDefinition & {color: string})[];
}

export default function TextDetail({
  attributes,
  annotationLegends,
  linkLegends,
}: TextDetailProp) {
  const {selectedLegendIds, selectedLegendAttributeIds} = useTextViewerState();

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
          dispatch={dispatch}
        />

        <LegendList
          title="Link Legends"
          legends={linkLegends}
          selectedLegendIds={selectedLegendIds}
          selectedLegendAttributeIds={selectedLegendAttributeIds}
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
