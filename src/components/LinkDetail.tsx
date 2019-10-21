import React from 'react';
import { ILink } from '../lib/interfaces';
import Attributes from './Attributes';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';

export interface LinkDetailProp {
  link: ILink | null;
}

export default function LinkDetail({ link }: LinkDetailProp) {
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
