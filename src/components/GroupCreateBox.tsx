import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import style from '../styles/CreateBox.module.css';
import { shortId } from '../lib/utils';
import {
  useTextViewerDispatch,
  useTextViewerState,
} from '../contexts/text-viewer.context';
import { IOntology, ISelectOption } from '../lib/interfaces';

interface GroupCreateBoxProp {
  groupEditAnnotationIds: string[];
  groupEditLinkIds: string[];
  ontology: IOntology;
}

export default function GroupCreateBox({
  groupEditAnnotationIds,
  groupEditLinkIds,
  ontology,
}: GroupCreateBoxProp) {
  const dispatch = useTextViewerDispatch();
  const { groupEditSelectedLegendId } = useTextViewerState();
  const [slideInAnimated, setSlideInAnimated] = useState(false);

  const legendTypeOptions = ontology.entryDefinitions
    .filter(entry => {
      return !!entry.memberType;
    })
    .map(def => {
      return {
        value: def.entryName,
        label: shortId(def.entryName),
      };
    });

  // const selectedLegendDefinition = ontology.entryDefinitions.find(def => {
  //   return def.entryName === linkEditSelectedLegendId;
  // });

  const selectedLegendTypeOption = legendTypeOptions.find(legendType => {
    return groupEditSelectedLegendId === legendType.value;
  });

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

      <div className={style.legend_type_container}>
        <div className={style.legend_type_title}>Legend Type</div>
        <Select
          value={selectedLegendTypeOption}
          onChange={item => {
            const selectedItem = item as ISelectOption;
            dispatch({
              type: 'group-edit-select-legend-type',
              legendId: selectedItem.value,
            });
          }}
          options={legendTypeOptions}
        />
      </div>

      <div className={style.buttons}>
        <button onClick={() => dispatch({ type: 'cancel-add-group' })}>
          Cancel
        </button>
        <button
          disabled={!(hasSelectedAny && groupEditSelectedLegendId)}
          onClick={() => dispatch({ type: 'submit-add-group' })}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
