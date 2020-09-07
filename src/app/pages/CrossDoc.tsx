import React, { useEffect, useState } from 'react';
import CrossViewer from '../../crossviewer';
import {transformPack, ISinglePack} from '../../nlpviewer';
import {IMultiPack, IMultiPackQuestion} from "../../crossviewer/components/lib/interfaces";
import {
  transformMultiPack,
  transformBackMultiPack,
  transformMultiPackQuestion
} from "../../crossviewer/components/lib/utils";
import {useParams, useHistory} from 'react-router-dom';
import {
  addCrossLink,
  deleteCrossLink,
  fetchCrossDoc,
  updateCrossLink
} from '../lib/api';


function CrossDoc() {
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
        setForteID(data.forteID);
        const MultiPack = transformMultiPack(data.crossDocPack.textPack, data.forteID);
        const MultiPackQuestion = transformMultiPackQuestion(data.crossDocPack.textPack);
        setMultiPack(MultiPack);
        // const MultiPackOntology = transformMultiPackOntology(data.crossDocPack.ontology);
        setMultiPackQuestion(MultiPackQuestion);
        setNextID(data.nextID);
        setSecretCode(data.secret_code);
      });
    }
  }, [id]);

  if (!packA || !packB || !multiPack || !multiPackQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <CrossViewer
      key={id}
      textPackA={packA}
      textPackB={packB}
      multiPack={multiPack}
      multiPackQuestion={multiPackQuestion}
      nextID = {nextID}
      secretCode = {secretCode}
      onEvent={event => {
        if (!id) return;
        if (event.type === 'link-add') {
          const { type, newLink } = event;
          const linkAPIData = transformBackMultiPack(newLink);
          const finalAPIData = {link:linkAPIData};
          addCrossLink(id, finalAPIData).then((return_object ) => {
            setMultiPack(transformMultiPack(return_object.crossDocPack.textPack, forteID));
          });
        } else if (event.type ==="link-delete") {
          const { type, linkID } = event;
          deleteCrossLink(id, linkID).then((return_object ) => {
            setMultiPack(transformMultiPack(return_object.crossDocPack.textPack, forteID));
          });

        } else if (event.type === 'link-update') {
          const { type, newLink } = event;
          const linkAPIData = transformBackMultiPack(newLink);
          const finalAPIData = {link:linkAPIData};
          updateCrossLink(id, finalAPIData).then((return_object ) => {
            setMultiPack(transformMultiPack(return_object.crossDocPack.textPack, forteID));
          });
        }

      }}
    />
  );
}

export default CrossDoc;
