import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  useTextViewerDispatch,
  useTextViewerState,
} from '../contexts/text-viewer.context';
import style from '../styles/CreateBox.module.css';
import { IOntology } from '../lib/interfaces';
import { shortId } from '../lib/utils';

export interface AnnotationCreateBoxProp {
  cursorBegin: number | null;
  cursorEnd: number | null;
  ontology: IOntology;
}

interface SelectOption {
  value: string;
  label: string;
}

export default function AnnotationCreateBox({
  cursorBegin,
  cursorEnd,
  ontology,
}: AnnotationCreateBoxProp) {
  const dispatch = useTextViewerDispatch();
  const { annoEditSelectedLegendId } = useTextViewerState();
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
  }, [cursorEnd]);

  const legendTypeOptions = ontology.entryDefinitions.map(def => {
    return {
      value: def.entryName,
      label: shortId(def.entryName),
    };
  });

  const selectedLegendDefinition = ontology.entryDefinitions.find(def => {
    return def.entryName === annoEditSelectedLegendId;
  });

  const selectedLegendTypeOption = legendTypeOptions.find(legendType => {
    return annoEditSelectedLegendId === legendType.value;
  });

  const isAddEnabled =
    cursorBegin !== null && cursorEnd !== null && annoEditSelectedLegendId;

  return (
    <div
      className={`${style.create_box}
      ${slideInAnimated && style.slide_in_animated}`}
    >
      <div className={style.create_entry_container}>
        <div className={style.create_title}>Begin</div>
        <div className={style.create_id}>
          {cursorBegin !== null ? cursorBegin : ''}
        </div>
      </div>

      <div
        className={`${style.create_entry_container}
          ${
            flashAnimated ? style.flash_animated_on : style.flash_animated_off
          }`}
      >
        <div className={style.create_title}>End</div>
        <div
          className={`${style.create_id}
          ${cursorEnd === null && style.to_be_select}`}
        >
          {cursorEnd !== null ? cursorEnd : '[Click text to select end]'}
        </div>
      </div>

      <div className={style.legend_type_container}>
        <div className={style.legend_type_title}>Legend Type</div>
        <Select
          value={selectedLegendTypeOption}
          onChange={item => {
            const selectedItem = item as SelectOption;
            dispatch({
              type: 'annotation-edit-select-legend-type',
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
              type: 'annotation-edit-cancel',
            });
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            dispatch({
              type: 'annotation-edit-submit',
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
