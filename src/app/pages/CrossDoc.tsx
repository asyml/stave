import React, { useEffect, useState } from 'react';
import CrossViewer from '../../crossviewer';
import {transformPack, ISinglePack} from '../../nlpviewer';
import {IMultiPack} from "../../crossviewer/components/lib/interfaces";
import {transformMultiPack, transformBackMultiPack} from "../../crossviewer/components/lib/utils";
import {useParams, useLocation, useHistory} from 'react-router-dom';
import {addAnnotation, addCrossLink, addLink, deleteAnnotation, deleteLink, fetchCrossDoc} from '../lib/api';


function CrossDoc() {
  let { id } = useParams();
  const [packA, setPackA] = useState<ISinglePack | null>(null);
  const [packB, setPackB] = useState<ISinglePack | null>(null);
  const [multiPack, setMultiPack] = useState<IMultiPack|null>(null);
  const [nextCrossDocId, setNextCrossDocId]= useState<string>("-1");
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
        setMultiPack(MultiPack);
        if (data.nextCrossDocId != "-1"){
          setNextCrossDocId(data.nextCrossDocId);
        }

      });
    }
  }, [id]);

  if (!packA || !packB || !multiPack) {
    return <div>Loading...</div>;
  }

  return (
    <CrossViewer
      textPackA={packA}
      textPackB={packB}
      multiPack={multiPack}
      nextCrossDocEnabled={nextCrossDocId != "-1"}
      onEvent={event => {
        if (!id) return;
        if (event.type === 'link-add') {
          const { type, link, input } = event;
          const linkAPIData = transformBackMultiPack(link);
          const finalAPIData = {link:linkAPIData, input:input};
          addCrossLink(id, finalAPIData).then((return_object ) => {
            const return_id  = return_object.id;
            link.id = return_id;
            let newCrossDocLink = multiPack.crossDocLink;
            newCrossDocLink.push(link);
            setMultiPack({
              _parent_doc:multiPack._parent_doc,
              _child_doc:multiPack._child_doc,
              crossDocLink:newCrossDocLink,
            });
          });
        } else if (event.type == "next-document") {
          history.push("/crossdocs/"+nextCrossDocId);
        }

      }}
    />
  );
}

export default CrossDoc;
