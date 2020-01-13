import React, { useEffect, useState } from 'react';
import NLPViewer, {
  ISinglePack,
  IOntology,
  transformPack,
} from '../../nlpviewer';
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
        const [singlePackFromAPI, ontologyFromAPI] = transformPack(
          data.textPack,
          data.ontology
        );

        setPack({
          pack: singlePackFromAPI,
          ontology: ontologyFromAPI,
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
