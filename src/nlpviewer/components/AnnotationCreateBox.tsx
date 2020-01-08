import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  useTextViewerDispatch,
  useTextViewerState,
} from '../contexts/text-viewer.context';
import style from '../styles/CreateBox.module.css';
import {
  IOntology,
  ISelectOption,
  IEntryAttributeDefinition,
} from '../lib/interfaces';
import { shortId, isEntryAnnotation } from '../lib/utils';

export interface AnnotationCreateBoxProp {
  cursorBegin: number | null;
  cursorEnd: number | null;
  ontology: IOntology;
}

interface AttrConstraint {
  [attrName: string]: Set<string>;
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

  const legendTypeOptions = ontology.entryDefinitions
    .filter(entry => {
      return isEntryAnnotation(ontology, entry.entryName);
    })
    .map(def => {
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

  function renderAttributeSelect() {
    if (
      !selectedLegendDefinition ||
      !selectedLegendDefinition.attributes ||
      !selectedLegendDefinition.attributes.length
    ) {
      return null;
    }

    const legendConstraint =
      ontology.constraints[selectedLegendDefinition.entryName] || [];
    const attrConstraint: AttrConstraint = {};

    legendConstraint.forEach(cons => {
      Object.keys(cons.attributes || {}).forEach(attrName => {
        const attrValues = cons.attributes[attrName] as any[];
        attrConstraint[attrName] = attrConstraint[attrName] || new Set<any>();
        attrValues.forEach((v: any) => attrConstraint[attrName].add(v));
      });
    });

    return (
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

              {renderAttributeInput(attr, attrConstraint)}
            </div>
          );
        })}
      </div>
    );
  }

  function renderAttributeInput(
    attr: IEntryAttributeDefinition,
    attrConstraint: AttrConstraint
  ) {
    if (attrConstraint[attr.attributeName]) {
      const options = Array.from(attrConstraint[attr.attributeName]).map(v => ({
        value: v,
        label: v,
      }));

      const selectedOption = options.find(
        o => o.value === enteredAttribute[attr.attributeName]
      );

      return (
        <div>
          <Select
            className={style.input}
            value={selectedOption}
            onChange={item => {
              setEnteredAttribute({
                ...enteredAttribute,
                [attr.attributeName]: (item as ISelectOption).value,
              });
            }}
            options={options}
          />
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="text"
            className={style.input}
            value={enteredAttribute[attr.attributeName] || ''}
            onChange={e =>
              setEnteredAttribute({
                ...enteredAttribute,
                [attr.attributeName]: e.target.value,
              })
            }
          />
        </div>
      );
    }
  }

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
            const selectedItem = item as ISelectOption;
            dispatch({
              type: 'annotation-edit-select-legend-type',
              legendId: selectedItem.value,
            });
          }}
          options={legendTypeOptions}
        />
      </div>

      {renderAttributeSelect()}

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
          Confirm
        </button>
      </div>
    </div>
  );
}
