import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import {withStyles, Theme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import {IEntryDefinition, IAttributes} from '../lib/interfaces';
import {
  useTextViewerState,
  useTextViewerDispatch,
} from '../contexts/text-viewer.context';
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
  const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      minWidth: 200,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);
  const metadataTabItem = {
    title: 'metadata',
    body: () => (
      <div>
        Metadata
        <Attributes attributes={attributes} />
      </div>
    ),
  };

  const dispatch = useTextViewerDispatch();
  return (
    <>
      <HtmlTooltip
        title={
          <React.Fragment>
            Metadata
            <Attributes attributes={attributes} />
          </React.Fragment>
        }
      >
        <IconButton
          aria-label="Info Metadata"
          style={{marginLeft: 190, marginTop: -55}}
        >
          <InfoIcon />
        </IconButton>
      </HtmlTooltip>

      <LegendList
        legends={[...annotationLegends, ...linkLegends]}
        selectedLegendIds={selectedLegendIds}
        selectedLegendAttributeIds={selectedLegendAttributeIds}
        dispatch={dispatch}
      />
    </>
  );
}
