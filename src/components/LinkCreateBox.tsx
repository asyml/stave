import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  useTextViewerDispatch,
  useTextViewerState,
} from '../contexts/text-viewer.context';
import style from '../styles/LinkCreateBox.module.css';
import { IOntology } from '../lib/interfaces';
import { shortId } from '../lib/utils';

export interface LinkCreateBoxProp {
  fromEntryId: string | null;
  toEntryId: string | null;
  ontology: IOntology;
}

interface SelectOption {
  value: string;
  label: string;
}

export default function LinkCreateBox({
  fromEntryId,
  toEntryId,
  ontology,
}: LinkCreateBoxProp) {
  const dispatch = useTextViewerDispatch();
  const { linkEditSelectedLegendId } = useTextViewerState();
  const [slideInAnimated, setSlideInAnimated] = useState(false);
  const [flashAnimated, setFlashAnimated] = useState(false);
  const [enteredAttribute, setEnteredAttribute] = useState<any>({});

  useEffect(() => {
    setSlideInAnimated(true);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setFlashAnimated(true);
    }, 100);
    return () => {
      setFlashAnimated(false);
    };
  }, [toEntryId]);

  const legendTypeOptions = ontology.entryDefinitions.map(def => {
    return {
      value: def.entryName,
      label: shortId(def.entryName),
    };
  });

  const selectedLegendDefinition = ontology.entryDefinitions.find(def => {
    return def.entryName === linkEditSelectedLegendId;
  });

  const selectedLegendTypeOption = legendTypeOptions.find(legendType => {
    return linkEditSelectedLegendId === legendType.value;
  });

  const isAddEnabled = fromEntryId && toEntryId && linkEditSelectedLegendId;

  return (
    <div
      className={`${style.link_create_box}
      ${slideInAnimated && style.slide_in_animated}`}
    >
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
          {fromEntryId ? shortId(fromEntryId) : ''}
        </div>
      </div>

      <div
        className={`${style.link_create_entry_container}
          ${
            flashAnimated ? style.flash_animated_on : style.flash_animated_off
          }`}
      >
        <div className={style.link_create_title}>Child</div>
        <div
          className={`${style.link_create_id}
          ${!toEntryId && style.link_to_be_select}`}
          onClick={() => {
            if (fromEntryId && toEntryId) {
              dispatch({
                type: 'select-annotation',
                annotationId: toEntryId,
              });
            }
          }}
        >
          {toEntryId ? shortId(toEntryId) : '[Click annotaion to select]'}
        </div>
      </div>

      <div className={style.legend_type_container}>
        <div className={style.legend_type_title}>Legend Type</div>
        <Select
          value={selectedLegendTypeOption}
          onChange={item => {
            const selectedItem = item as SelectOption;
            dispatch({
              type: 'link-edit-select-legend-type',
              legendId: selectedItem.value,
            });
          }}
          options={legendTypeOptions}
        />
      </div>

      {selectedLegendDefinition &&
        selectedLegendDefinition.attributes &&
        selectedLegendDefinition.attributes.length && (
          <div className={style.legend_attributes}>
            {(selectedLegendDefinition.attributes || []).map(attr => {
              return (
                <div
                  className={style.legend_attribute_item}
                  key={attr.attributeName}
                >
                  <div className={style.legend_attribute_item_title}>
                    {attr.attributeName}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={enteredAttribute[attr.attributeName] || ''}
                      onChange={e =>
                        setEnteredAttribute({
                          ...enteredAttribute,
                          [attr.attributeName]: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

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
              enteredAttributes: enteredAttribute,
            });
          }}
          disabled={!isAddEnabled}
        >
          Add
        </button>
      </div>
    </div>
  );
}
