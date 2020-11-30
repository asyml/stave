import React, {useEffect} from 'react';
import TextViewer, {OnEventType} from './components/TextViewer';
import {
  TextViewerProvider,
  useTextViewerDispatch,
} from './contexts/text-viewer.context';

import './lib/log';
import './styles/normalize.css';
import './styles/global.css';
import {
  ISinglePack,
  IOntology,
  IPlugin,
  IProjectConfigs,
} from './lib/interfaces';

export * from './lib/transform';
export * from './lib/interfaces';
export * from './contexts/text-viewer.context';

export interface NLPViewerProp {
  textPack: ISinglePack;
  ontology: IOntology;
  plugins: IPlugin[];
  projectConfig: IProjectConfigs;
  onEvent?: OnEventType;
}

export default function NLPViewer(props: NLPViewerProp) {
  return (
    <TextViewerProvider>
      <TextViewerFetchContainer {...props} />;
    </TextViewerProvider>
  );
}

function TextViewerFetchContainer(props: NLPViewerProp) {
  const dispatch = useTextViewerDispatch();

  useEffect(() => {
    dispatch({
      type: 'set-text-pack',
      textPack: props.textPack,
    });

    dispatch({
      type: 'set-ontology',
      ontology: props.ontology,
    });
  }, [dispatch, props.textPack, props.ontology]);

  return (
    <TextViewer
      plugins={props.plugins}
      onEvent={props.onEvent}
      projectConfig={props.projectConfig}
    />
  );
}
