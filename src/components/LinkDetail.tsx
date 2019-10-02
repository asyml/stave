import React from 'react';
import { ILink } from '../lib/interfaces';
import Attributes from './Attributes';

export interface LinkDetailProp {
  link: ILink | null;
}

export default function LinkDetail({ link }: LinkDetailProp) {
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
    </div>
  );
}
