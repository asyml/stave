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
  IDocuments,
} from './lib/interfaces';

export * from './lib/transform';
export * from './lib/interfaces';
export * from './contexts/text-viewer.context';

export interface NLPViewerOptions {
  allowEditAnnotations: Boolean; // TODO: document
  enableScopeSelector: Boolean;
}
export interface NLPViewerProp {
  textPack: ISinglePack;
  ontology: IOntology;
  plugins: IPlugin[];
  projectConfig: IProjectConfigs;
  documents: IDocuments;
  onEvent?: OnEventType;
  options?: NLPViewerOptions;
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
      documents={props.documents}
      options={props.options}
    />
  );
}
