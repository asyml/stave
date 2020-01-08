import React from 'react';
import { IAttributes } from '../lib/interfaces';
import style from '../styles/Attributes.module.css';

export type AttributesProp = {
  attributes: IAttributes;
};

export default function Attributes({ attributes }: AttributesProp) {
  return (
    <>
      {Object.keys(attributes).map(key => (
        <div className={style.attribute} key={key}>
          <div className={style.attribute_name}>{key}</div>

          {Array.isArray(attributes[key]) ? (
            <ul className={style.attribute_value_array}>
              {attributes[key].map((item: string, i: number) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          ) : (
            <div className={style.attribute_value}>{attributes[key]}</div>
          )}
        </div>
      ))}
    </>
  );
}
