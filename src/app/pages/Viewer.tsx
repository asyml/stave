import React, { useEffect, useState } from 'react';
import { singlePack } from '../mock-data-2';
import { ontology } from '../mock-config-data';
import NLPViewer, { ISinglePack, IOntology } from '../../nlpviewer';
import groupPlugin from '../../plugins/Group';
import { useParams } from 'react-router-dom';
import { fetchDocument } from '../lib/api';

interface WholePack {
  pack: ISinglePack;
  ontology: IOntology;
}

function Viewer() {
  let { id } = useParams();
  const [pack, setPack] = useState<WholePack | null>(null);

  useEffect(() => {
    if (id) {
      fetchDocument(id).then(data => {
        console.log(data);
        setPack({
          pack: singlePack,
          ontology: ontology,
        });
      });
    }
  }, [id]);

  if (!pack) {
    return <div>Loading...</div>;
  }

  return (
    <NLPViewer
      textPack={pack.pack}
      ontology={pack.ontology}
      plugins={[groupPlugin]}
    />
  );
}

export default Viewer;
