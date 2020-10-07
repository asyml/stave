import React from 'react';
import { IOntology, ISelectOption, IScopeConfigs} from '../lib/interfaces';
import { isAvailableScope, isEntryAnnotation, shortId } from '../lib/utils';
import Select from 'react-select';
import style from '../styles/ScopeSelectorProp.module.css';
import { useTextViewerDispatch } from '../contexts/text-viewer.context';

export type ScopeSelectorProp = {
  ontology: IOntology;
  selectedScopeId: string | null;
  selectedScopeIndex: number;
  scopeConfig: IScopeConfigs;
};

export default function ScopeSelector({
  ontology,
  selectedScopeId,
  selectedScopeIndex,
  scopeConfig,
}: ScopeSelectorProp) {
  const dispatch = useTextViewerDispatch();
  const legendTypeOptions: {
    value: string | null;
    label: string;
  }[] = ontology.definitions
    .filter(entry => {
      return isEntryAnnotation(ontology, entry.entryName) && isAvailableScope(scopeConfig, entry.entryName);
    })
    .map(def => {
      return {
        value: def.entryName,
        label: shortId(def.entryName),
      };
    });

  legendTypeOptions.unshift({ value: null, label: 'All' });

  const selectedLegendTypeOptions = legendTypeOptions.find(legendType => {
    return selectedScopeId === legendType.value;
  });

  return (
    <Select
      className={style.input}
      value={selectedLegendTypeOptions}
      onChange={item => {
        dispatch({
          type: 'set-scope',
          scopeId: (item as ISelectOption).value,
        });
      }}
      options={legendTypeOptions}
    />
  );
}
