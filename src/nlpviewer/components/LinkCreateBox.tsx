import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  useTextViewerDispatch,
  useTextViewerState,
  getState,
} from '../contexts/text-viewer.context';
import style from '../styles/CreateBox.module.css';
import {
  IOntology,
  ISelectOption,
  IAnnotation,
  IConstraint,
} from '../lib/interfaces';
import { shortId, isEntryLink } from '../lib/utils';
import { OnEventType } from './TextViewer';

export interface LinkCreateBoxProp {
  fromEntryId: string | null;
  toEntryId: string | null;
  ontology: IOntology;
  onEvent?: OnEventType;
}

export default function LinkCreateBox({
  fromEntryId,
  toEntryId,
  ontology,
  onEvent,
}: LinkCreateBoxProp) {
  const dispatch = useTextViewerDispatch();
  const { linkEditSelectedLegendId, textPack } = useTextViewerState();
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

  const selectedLegendDefinition = ontology.definitions.find(def => {
    return def.entryName === linkEditSelectedLegendId;
  });

  const isAddEnabled = fromEntryId && toEntryId && linkEditSelectedLegendId;

  function renderLegendSelect() {
    if (!fromEntryId || !toEntryId || !textPack) {
      return null;
    }
    const fromEntry = textPack.annotations.find(
      ann => ann.id === fromEntryId
    ) as IAnnotation;
    const toEntry = textPack.annotations.find(
      ann => ann.id === toEntryId
    ) as IAnnotation;

    const legendTypeOptions = ontology.definitions
      .filter(entry => {
        return isEntryLink(ontology, entry.entryName);
      })
      // filter by constraint
      .filter(entry => {
        const constraints = ontology.constraints[entry.entryName];
        if (!constraints) return true;

        const matchedConstraint = constraints.find(constraint =>
          matchLinkConstraint(constraint, fromEntry, toEntry)
        );

        return !!matchedConstraint;
      })
      .map(def => {
        return {
          value: def.entryName,
          label: shortId(def.entryName),
        };
      });

    const selectedLegendTypeOption = legendTypeOptions.find(legendType => {
      return linkEditSelectedLegendId === legendType.value;
    });

    return (
      <div className={style.legend_type_container}>
        <div className={style.legend_type_title}>Legend Type</div>

        {legendTypeOptions.length ? (
          <Select
            value={selectedLegendTypeOption}
            onChange={item => {
              const selectedItem = item as ISelectOption;
              dispatch({
                type: 'link-edit-select-legend-type',
                legendId: selectedItem.value,
              });
            }}
            options={legendTypeOptions}
          />
        ) : (
          'No options'
        )}
      </div>
    );
  }

  return (
    <div
      className={`${style.create_box}
      ${slideInAnimated && style.slide_in_animated}`}
    >
      <div className={style.create_entry_container}>
        <div className={style.create_title}>Parent</div>
        <div
          className={style.create_id}
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
        className={`${style.create_entry_container}
          ${
            flashAnimated ? style.flash_animated_on : style.flash_animated_off
          }`}
      >
        <div className={style.create_title}>Child</div>
        <div
          className={`${style.create_id}
          ${!toEntryId && style.to_be_select}`}
          onClick={() => {
            if (fromEntryId && toEntryId) {
              dispatch({
                type: 'select-annotation',
                annotationId: toEntryId,
              });
            }
          }}
        >
          {toEntryId ? shortId(toEntryId) : '[Click annotation to select]'}
        </div>
      </div>

      {renderLegendSelect()}

      {selectedLegendDefinition &&
        selectedLegendDefinition.attributes &&
        selectedLegendDefinition.attributes.length && (
          <div className={style.legend_attributes}>
            {(selectedLegendDefinition.attributes || []).map(attr => {
              return (
                <div
                  className={style.legend_attribute_item}
                  key={attr.name}
                >
                  <div className={style.legend_attribute_item_title}>
                    {attr.name}
                  </div>
                  <div>
                    <input
                      type="text"
                      value={enteredAttribute[attr.name] || ''}
                      onChange={e =>
                        setEnteredAttribute({
                          ...enteredAttribute,
                          [attr.name]: e.target.value,
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
            if (onEvent) {
              let state = getState();

              onEvent({
                type: 'link-add', // TODO: add strick type for event
                fromEntryId: state.linkEditFromEntryId,
                toEntryId: state.linkEditToEntryId,
                legendId: state.linkEditSelectedLegendId,
                attributes: enteredAttribute,
              });
            }

            dispatch({
              type: 'end-create-link',
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

function matchLinkConstraint(
  constraint: {
    [propertyName: string]: IConstraint;
  },
  fromEntry: IAnnotation,
  toEntry: IAnnotation
) {
  return (
    matchLinkConstraintEntry(constraint.parentType, fromEntry) &&
    matchLinkConstraintEntry(constraint.childType, toEntry)
  );
}

function matchLinkConstraintEntry(entryConstraint: IConstraint, entry: any) {
  let isMatch = true;

  Object.keys(entryConstraint).forEach(propKey => {
    const propValues = entryConstraint[propKey];

    if (Array.isArray(propValues)) {
      if (!propValues.includes(entry[propKey])) {
        isMatch = false;
      }
    } else {
      if (!matchLinkConstraintEntry(propValues, entry[propKey])) {
        isMatch = false;
      }
    }
  });

  return isMatch;
}
