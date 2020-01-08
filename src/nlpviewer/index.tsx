import React, { useEffect } from 'react';
import TextViewer, { TextViewerProp } from './components/TextViewer';
import {
  TextViewerProvider,
  useTextViewerDispatch,
} from './contexts/text-viewer.context';

import './lib/log';
import './styles/normalize.css';
import './styles/global.css';

export * from './lib/interfaces';
export * from './contexts/text-viewer.context';

export default function NLPViewer(props: TextViewerProp) {
  return (
    <TextViewerProvider>
      <TextViewerFetchContainer {...props} />;
    </TextViewerProvider>
  );
}

function TextViewerFetchContainer(props: TextViewerProp) {
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
  }, [dispatch, props]);

  return <TextViewer {...props} />;
}
