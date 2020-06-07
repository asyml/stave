import React, { useEffect, useState } from 'react';
import CrossViewer from '../../crossviewer';
import {transformPack, ISinglePack} from '../../nlpviewer';
import {IMultiPack, IMultiPackQuestion} from "../../crossviewer/components/lib/interfaces";
import {
  transformMultiPack,
  transformBackMultiPack,
  transformMultiPackQuestion
} from "../../crossviewer/components/lib/utils";
import {useParams, useLocation, useHistory} from 'react-router-dom';
import {
  addAnnotation,
  addCrossLink,
  addLink,
  deleteAnnotation, deleteCrossLink,
  deleteLink,
  fetchCrossDoc,
  updateCrossLink
} from '../lib/api';


function CrossDoc() {
  let { id } = useParams();
  const [packA, setPackA] = useState<ISinglePack | null>(null);
  const [packB, setPackB] = useState<ISinglePack | null>(null);
  const [multiPack, setMultiPack] = useState<IMultiPack|null>(null);
  const [multiPackQuestion, setMultiPackQuestion] = useState<IMultiPackQuestion|null>(null);
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
        const MultiPack = transformMultiPack(data.crossDocPack.textPack);
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
    <CrossViewer
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
            setMultiPack(transformMultiPack(return_object.crossDocPack.textPack));
          });
        } else if (event.type ==="link-delete") {
          const { type, linkID } = event;
          deleteCrossLink(id, linkID).then((return_object ) => {
            setMultiPack(transformMultiPack(return_object.crossDocPack.textPack));
          });

        } else if (event.type === 'link-update') {
          const { type, newLink } = event;
          const linkAPIData = transformBackMultiPack(newLink);
          const finalAPIData = {link:linkAPIData};
          updateCrossLink(id, finalAPIData).then((return_object ) => {
            setMultiPack(transformMultiPack(return_object.crossDocPack.textPack));
            let newCrossDocLink = multiPack.crossDocLink;
            // newCrossDocLink.push(newLink);
            // setMultiPack({
            //   _parent_doc:multiPack._parent_doc,
            //   _child_doc:multiPack._child_doc,
            //   crossDocLink:newCrossDocLink,
            // });
          });
        }

      }}
    />
  );
}

export default CrossDoc;
