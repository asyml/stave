import React from 'react';
import {ILink} from '../lib/interfaces';
import Attributes from './Attributes';
import {useTextViewerDispatch} from '../contexts/text-viewer.context';
import {OnEventType} from './TextViewer';

export interface LinkDetailProp {
  link: ILink | null;
  onEvent?: OnEventType;
}

export default function LinkDetail({link, onEvent}: LinkDetailProp) {
  const dispatch = useTextViewerDispatch();

  if (link === null) {
    return null;
  }

  return (
    <div>
      <Attributes
        attributes={{
          id: link.id,
          ...link.attributes,
        }}
      />

      <div>
        <button
          onClick={() => {
            if (onEvent) {
              onEvent({
                type: 'link-delete',
                linkId: link.id,
              });
            }

            dispatch({
              type: 'delete-link',
              linkId: link.id,
            });
          }}
        >
          remove
        </button>
      </div>
    </div>
  );
}
