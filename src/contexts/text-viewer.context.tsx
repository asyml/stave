import React, { createContext, useReducer, useContext } from 'react';
import { ISinglePack } from '../lib/interfaces';

type Action =
  | { type: 'set-text-pack'; textPach: ISinglePack }
  | { type: 'select-legend'; legendId: string }
  | { type: 'deselect-legend'; legendId: string }
  | { type: 'select-all-legend' }
  | { type: 'deselect-all-legend' }
  | { type: 'select-annotation'; annotationId: string }
  | { type: 'deselect-annotation' };

type Dispatch = (action: Action) => void;
type State = {
  textPack: ISinglePack | null;
  selectedLegendIds: string[];
  selectedAnnotationId: string | null;
};
type TextViewerProviderProps = { children: React.ReactNode };

const TextViewerStateContext = createContext<State | undefined>(undefined);
const TextViewerDispatchContext = createContext<Dispatch | undefined>(
  undefined
);

function textViewerReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-text-pack':
      return {
        ...state,
        textPack: action.textPach,

        // TODO: remove the following test code
        selectedLegendIds: ['l0'],
        // selectedAnnotationId: 'OntonotesOntology.PredicateMention.7'
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
        selectedLegendIds: state.textPack.legends.map(l => l.id),
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
  }
}

function TextViewerProvider({ children }: TextViewerProviderProps) {
  const [state, dispatch] = useReducer(textViewerReducer, {
    textPack: null,
    selectedLegendIds: [],
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
