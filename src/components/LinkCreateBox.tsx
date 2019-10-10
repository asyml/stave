import React, { useEffect, useState } from 'react';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';
import style from '../styles/LinkCreateBox.module.css';

export interface LinkCreateBoxProp {
  fromEntryId: string | null;
  toEntryId: string | null;
}

export default function LinkCreateBox({
  fromEntryId,
  toEntryId,
}: LinkCreateBoxProp) {
  const dispatch = useTextViewerDispatch();
  const [animated, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className={`${style.link_create_box} ${animated && style.animated}`}>
      <div className={style.link_create_entry_container}>
        <div className={style.link_create_title}>Parent</div>
        <div
          className={style.link_create_id}
          onClick={() => {
            // only allow to select when link is select is created
            if (fromEntryId && toEntryId) {
              dispatch({
                type: 'select-annotation',
                annotationId: fromEntryId,
              });
            }
          }}
        >
          {fromEntryId || ''}
        </div>
      </div>

      <div className={style.link_create_entry_container}>
        <div className={style.link_create_title}>Child</div>
        <div
          className={`${style.link_create_id} ${!toEntryId &&
            style.link_to_be_select}`}
          onClick={() => {
            if (fromEntryId && toEntryId) {
              dispatch({
                type: 'select-annotation',
                annotationId: toEntryId,
              });
            }
          }}
        >
          {toEntryId || '[Click annotaion to select]'}
        </div>
      </div>

      <div className={style.buttons}>
        <button
          onClick={() => {
            dispatch({
              type: 'cancel-create-link',
            });
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            dispatch({
              type: 'end-create-link',
            });
          }}
          disabled={!fromEntryId || !toEntryId}
        >
          Add
        </button>
      </div>
    </div>
  );
}
