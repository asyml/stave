import React, { useEffect, useState } from 'react';
import NLPViewer, {
  ISinglePack,
  IOntology,
  transformPack,
  transformBackAnnotation,
  transformBackLink,
} from '../../nlpviewer';
import groupPlugin from '../../plugins/Group';
import { useParams } from 'react-router-dom';
import {
  fetchDocument,
  addAnnotation,
  deleteAnnotation,
  addLink,
  deleteLink,
} from '../lib/api';

interface WholePack {
  singlePack: ISinglePack;
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
          singlePack: singlePackFromAPI,
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
      textPack={pack.singlePack}
      ontology={pack.ontology}
      plugins={[groupPlugin]}
      onEvent={event => {
        if (!id) return;

        console.log(event);

        if (event.type === 'annotation-add') {
          const { type, ...annotation } = event;
          const annotationAPIData = transformBackAnnotation(annotation);

          addAnnotation(id, annotationAPIData).then(({ id }) => {
            annotation.id = id;

            setPack({
              singlePack: {
                ...pack.singlePack,
                annotations: [...pack.singlePack.annotations, annotation],
              },
              ontology: pack.ontology,
            });
          });
        } else if (event.type === 'annotation-delete') {
          deleteAnnotation(id, event.annotationId).then(() => {
            setPack({
              singlePack: {
                ...pack.singlePack,
                annotations: pack.singlePack.annotations.filter(
                  a => a.id !== event.annotationId
                ),
              },
              ontology: pack.ontology,
            });
          });
        } else if (event.type === 'link-add') {
          const { type, ...link } = event;
          const linkAPIData = transformBackLink(link);

          addLink(id, linkAPIData).then(({ id }) => {
            link.id = id;
            setPack({
              singlePack: {
                ...pack.singlePack,
                links: [...pack.singlePack.links, link],
              },
              ontology: pack.ontology,
            });
          });
        } else if (event.type === 'link-delete') {
          deleteLink(id, event.linkId).then(() => {
            setPack({
              singlePack: {
                ...pack.singlePack,
                links: pack.singlePack.links.filter(a => a.id !== event.linkId),
              },
              ontology: pack.ontology,
            });
          });
        }
      }}
    />
  );
}

export default Viewer;
