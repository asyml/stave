import React, { useEffect, useState } from 'react';
import {transformPack, ISinglePack} from '../../nlpviewer';
import {IMultiPack, IMultiPackQuestion} from "../../crossviewer/components/lib/interfaces";
import {
  transformMultiPackQuestion, transformMultiPackAnnoViewer
} from "../../crossviewer/components/lib/utils";
import {useParams, useHistory} from 'react-router-dom';
import {
  fetchCrossDoc,
} from '../lib/api';
import IndexAnnotationViewer from "../../crossviewer/indexAnnotationViewer";


function CrossDocViewer() {
  let { id } = useParams();
  const [packA, setPackA] = useState<ISinglePack | null>(null);
  const [packB, setPackB] = useState<ISinglePack | null>(null);
  const [multiPack, setMultiPack] = useState<IMultiPack|null>(null);
  const [multiPackQuestion, setMultiPackQuestion] = useState<IMultiPackQuestion|null>(null);
  const [forteID, setForteID]  = useState<string>("");
  const [nextID, setNextID] = useState<string>("None");
  const [secretCode, setSecretCode] = useState<string>("");
  const history = useHistory();
  useEffect(() => {
    if (id) {
      fetchCrossDoc(id).then(data => {
        const [singlePackFromAPI, ontologyFromAPI] = transformPack(
            data._parent.textPack,
            data._parent.ontology
        );
        setPackA(singlePackFromAPI);
        const [singlePackFromAPI1, ontologyFromAPI1] = transformPack(
            data._child.textPack,
            data._child.ontology
        );
        setPackB(singlePackFromAPI1);
        const MultiPack = transformMultiPackAnnoViewer(data.crossDocPack.textPack);
        const MultiPackQuestion = transformMultiPackQuestion(data.crossDocPack.textPack);
        setMultiPack(MultiPack);
        // const MultiPackOntology = transformMultiPackOntology(data.crossDocPack.ontology);
        setMultiPackQuestion(MultiPackQuestion);
      });
    }
  }, [id]);

  if (!packA || !packB || !multiPack || !multiPackQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <IndexAnnotationViewer
      key={id}
      textPackA={packA}
      textPackB={packB}
      multiPack={multiPack}
      multiPackQuestion={multiPackQuestion}
      nextID = {nextID}
      secretCode = {secretCode}
      onEvent={event => {
      }}
    />
  );
}

export default CrossDocViewer;
