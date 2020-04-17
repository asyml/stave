import React from 'react';
import { IAttributes } from '../lib/interfaces';
import style from '../styles/Attributes.module.css';
import { displayAttributeSidebar } from '../lib/utils';

export type AttributesProp = {
  attributes: IAttributes;
};

export default function Attributes({ attributes }: AttributesProp) {
  return (
    <>
      {Object.keys(attributes).map(key => (
        <div className={style.attribute} key={key}>
          <div className={style.attribute_name}>{key}</div>

          {
            displayAttributeSidebar(attributes[key])
          }
        </div>
      ))}
    </>
  );
}
