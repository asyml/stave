import React from 'react';
import { singlePack } from '../mock-data-2';
import { ontology } from '../mock-config-data';
import NLPViewer from '../../nlpviewer';
import groupPlugin from '../../plugins/Group';

function Viewer() {
  return (
    <NLPViewer
      textPack={singlePack}
      ontology={ontology}
      plugins={[groupPlugin]}
    />
  );
}

export default Viewer;
