import React, { useEffect, useState } from 'react';
import style from '../styles/CreateBox.module.css';
import { shortId } from '../lib/utils';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';

interface GroupCreateBoxProp {
  groupEditAnnotationIds: string[];
  groupEditLinkIds: string[];
}

export default function GroupCreateBox({
  groupEditAnnotationIds,
  groupEditLinkIds,
}: GroupCreateBoxProp) {
  const dispatch = useTextViewerDispatch();
  const [slideInAnimated, setSlideInAnimated] = useState(false);

  const hasSelectedAnnotation = groupEditAnnotationIds.length > 0;
  const hasSelectedLink = groupEditLinkIds.length > 0;
  const hasSelectedAny = hasSelectedAnnotation || hasSelectedLink;

  useEffect(() => {
    if (hasSelectedAny) {
      setSlideInAnimated(true);
    }
    return () => {
      setSlideInAnimated(false);
    };
  }, [hasSelectedAny]);

  return (
    <div
      className={`${style.create_box}
        ${style.create_box_group}
        ${slideInAnimated && style.slide_in_animated}`}
    >
      <h2>Add Group</h2>

      {hasSelectedAny && (
        <div className={style.group_edit_container}>
          {hasSelectedAnnotation && <h3>Annotations</h3>}

          <div>
            {groupEditAnnotationIds.map(id => {
              return (
                <div className={style.group_edit_item} key={id}>
                  <span className={style.group_edit_item_id}>
                    {shortId(id)}
                  </span>
                  <button
                    onClick={() => {
                      dispatch({
                        type: 'select-annotation',
                        annotationId: id,
                      });
                    }}
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>

          {hasSelectedLink && <h3>Links</h3>}
          <div>
            {groupEditLinkIds.map(id => {
              return (
                <div className={style.group_edit_item} key={id}>
                  <span className={style.group_edit_item_id}>
                    {shortId(id)}
                  </span>

                  <button
                    onClick={() => {
                      dispatch({ type: 'select-link', linkId: id });
                    }}
                  >
                    &times;
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className={style.buttons}>
        <button onClick={() => dispatch({ type: 'cancel-add-group' })}>
          Cancel
        </button>
        <button
          disabled={!hasSelectedAny}
          onClick={() => dispatch({ type: 'submit-add-group' })}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
