import React, { createContext, useReducer, useContext } from 'react';
import { ISinglePack, IOntology } from '../lib/interfaces';

export type Action =
  | { type: 'set-text-pack'; textPack: ISinglePack }
  | { type: 'set-ontology'; ontology: IOntology }
  | { type: 'select-legend'; legendId: string }
  | { type: 'deselect-legend'; legendId: string }
  | { type: 'select-all-legend' }
  | { type: 'deselect-all-legend' }
  | { type: 'select-annotation'; annotationId: string }
  | { type: 'deselect-annotation' }
  | { type: 'select-legend-attribute'; legendId: string; attributeId: string }
  | {
      type: 'deselect-legend-attribute';
      legendId: string;
      attributeId: string;
    };

export type Dispatch = (action: Action) => void;
export type State = {
  textPack: ISinglePack | null;
  ontology: IOntology | null;
  selectedLegendIds: string[];
  selectedLegendAttributeIds: string[];
  selectedAnnotationId: string | null;
};
export type TextViewerProviderProps = { children: React.ReactNode };

const TextViewerStateContext = createContext<State | undefined>(undefined);
const TextViewerDispatchContext = createContext<Dispatch | undefined>(
  undefined
);

function textViewerReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-text-pack':
      return {
        ...state,
        textPack: action.textPack,

        // TODO: remove the following test code
        selectedLegendIds: [
          action.textPack.legends.annotations[0].id,
          action.textPack.legends.links[0].id,
        ],
        selectedLegendAttributeIds: [
          attributeId(action.textPack.legends.links[0].id, 'rel_type'),
        ],
        // selectedAnnotationId: 'OntonotesOntology.PredicateMention.7'
      };

    case 'set-ontology':
      return {
        ...state,
        ontology: action.ontology,
      };

    case 'select-legend':
      if (state.selectedLegendIds.indexOf(action.legendId) === -1) {
        return {
          ...state,
          selectedLegendIds: [...state.selectedLegendIds, action.legendId],
        };
      } else {
        return { ...state, selectedLegendIds: [...state.selectedLegendIds] };
      }

    case 'deselect-legend':
      if (state.selectedLegendIds.indexOf(action.legendId) === -1) {
        return { ...state, selectedLegendIds: [...state.selectedLegendIds] };
      } else {
        return {
          ...state,
          selectedLegendIds: state.selectedLegendIds.filter(
            id => id !== action.legendId
          ),
        };
      }

    case 'select-all-legend':
      if (!state.textPack) {
        return state;
      }

      return {
        ...state,
        selectedLegendIds: state.textPack.legends.annotations.map(l => l.id),
      };

    case 'deselect-all-legend':
      return {
        ...state,
        selectedLegendIds: [],
      };

    case 'select-annotation':
      return {
        ...state,
        selectedAnnotationId: action.annotationId,
      };

    case 'deselect-annotation':
      return {
        ...state,
        selectedAnnotationId: null,
      };

    case 'select-legend-attribute':
      if (
        state.selectedLegendAttributeIds.indexOf(
          attributeId(action.legendId, action.attributeId)
        ) === -1
      ) {
        return {
          ...state,
          selectedLegendAttributeIds: [
            ...state.selectedLegendAttributeIds,
            attributeId(action.legendId, action.attributeId),
          ],
        };
      } else {
        return {
          ...state,
          selectedLegendAttributeIds: [...state.selectedLegendAttributeIds],
        };
      }

    case 'deselect-legend-attribute':
      if (
        state.selectedLegendAttributeIds.indexOf(
          attributeId(action.legendId, action.attributeId)
        ) === -1
      ) {
        return {
          ...state,
          selectedLegendAttributeIds: [...state.selectedLegendAttributeIds],
        };
      } else {
        return {
          ...state,
          selectedLegendAttributeIds: state.selectedLegendAttributeIds.filter(
            id => id !== attributeId(action.legendId, action.attributeId)
          ),
        };
      }
  }
}

export function attributeId(legendId: string, attributeId: string) {
  return legendId + '_' + attributeId;
}

function TextViewerProvider({ children }: TextViewerProviderProps) {
  const [state, dispatch] = useReducer(textViewerReducer, {
    textPack: null,
    ontology: null,
    selectedLegendIds: [],
    selectedLegendAttributeIds: [],
    selectedAnnotationId: null,
  });

  return (
    <TextViewerStateContext.Provider value={state}>
      <TextViewerDispatchContext.Provider value={dispatch}>
        {children}
      </TextViewerDispatchContext.Provider>
    </TextViewerStateContext.Provider>
  );
}

function useTextViewerState() {
  const context = useContext(TextViewerStateContext);
  if (context === undefined) {
    throw new Error(
      'useTextViewerState must be used with a TextViewerProvider'
    );
  }
  return context;
}

function useTextViewerDispatch() {
  const context = useContext(TextViewerDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useTextViewerDispatch must be used with a TextViewerProvider'
    );
  }
  return context;
}

export { TextViewerProvider, useTextViewerState, useTextViewerDispatch };
