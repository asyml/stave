import React, {useEffect, useState} from 'react';
import CrossViewer from '../../crossviewer';
import {transformPack, ISinglePack} from '../../nlpviewer';
import {IMultiPack, IMultiPackQuestion} from '../../crossviewer';
import {
  transformMultiPack,
  transformBackMultiPack,
  transformMultiPackQuestion,
} from '../../crossviewer';
import {useParams, useHistory} from 'react-router-dom';
import {
  fetchCrossDoc,
  addCrossLink,
  deleteCrossLink,
  nextCrossDoc} from '../lib/api';
// @ts-ignore
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
// @ts-ignore
import AlertTemplate from 'react-alert-template-basic'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 3000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
};


function CrossDoc() {
  const {id} = useParams();
  const [packA, setPackA] = useState<ISinglePack | null>(null);
  const [packB, setPackB] = useState<ISinglePack | null>(null);
  const [multiPack, setMultiPack] = useState<IMultiPack | null>(null);
  const [
    multiPackQuestion,
    setMultiPackQuestion,
  ] = useState<IMultiPackQuestion | null>(null);
  const [forteID, setForteID] = useState<string>('');
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
        const MultiPack = transformMultiPack(
          data.crossDocPack.textPack,
          data.forteID
        );
        const MultiPackQuestion = transformMultiPackQuestion(
          data.crossDocPack.textPack
        );
        setMultiPack(MultiPack);
        setMultiPackQuestion(MultiPackQuestion);
      });
    }
  }, [id]);

  if (!packA || !packB || !multiPack || !multiPackQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <CrossViewer
        key={id}
        textPackA={packA}
        textPackB={packB}
        multiPack={multiPack}
        multiPackQuestion={multiPackQuestion}
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

          }
        }}
      />
    </AlertProvider>
  );
}

export default CrossDoc;
