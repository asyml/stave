import {
  ISinglePack,
  IOntology,
  ISpacedAnnotationSpan,
} from '../lib/interfaces';
import { createContextProvider } from '../lib/create-context-provider';

export type Dispatch = (action: Action) => void;

/**
 *
 *
 * The actions
 *
 *
 */

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
      type: 'set-spaced-annotation-span';
      spacedAnnotationSpan: ISpacedAnnotationSpan;
      spacedText: string;
    }
  | {
      type: 'deselect-legend-attribute';
      legendId: string;
      attributeId: string;
    };

/**
 *
 *
 * The state
 *
 *
 */

export type State = {
  textPack: ISinglePack | null;
  ontology: IOntology | null;
  selectedLegendIds: string[];
  selectedLegendAttributeIds: string[];
  selectedAnnotationId: string | null;
  spacingCalcuated: boolean;
  spacedAnnotationSpan: ISpacedAnnotationSpan;
  spacedText: string | null;
};

const defaultSpacingState = {
  spacingCalcuated: false,
  spacedText: null,
  spacedAnnotationSpan: {},
};

const initialState: State = {
  textPack: null,
  ontology: null,
  selectedLegendIds: [],
  selectedLegendAttributeIds: [],
  selectedAnnotationId: null,
  ...defaultSpacingState,
};

/**
 *
 *
 * The reducer
 *
 *
 */

function textViewerReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'set-text-pack':
      return {
        ...state,
        ...defaultSpacingState,
        textPack: action.textPack,

        // TODO: remove the following test code
        selectedLegendIds: [
          action.textPack.legends.annotations[0].id,
          action.textPack.legends.links[0].id,
        ],
        selectedLegendAttributeIds: [
          attributeId(action.textPack.legends.annotations[0].id, 'lemma'),
          attributeId(action.textPack.legends.annotations[0].id, 'pos_tag'),
          attributeId(action.textPack.legends.annotations[0].id, 'upos'),
          attributeId(action.textPack.legends.links[0].id, 'rel_type'),
        ],
        selectedAnnotationId:
          'forte.data.ontology.stanfordnlp_ontology.Token.6',
      };

    case 'set-ontology':
      return {
        ...state,
        ...defaultSpacingState,
        ontology: action.ontology,
      };

    case 'select-legend':
      if (state.selectedLegendIds.indexOf(action.legendId) === -1) {
        return {
          ...state,
          ...defaultSpacingState,
          selectedLegendIds: [...state.selectedLegendIds, action.legendId],
        };
      } else {
        return {
          ...state,
          ...defaultSpacingState,
          selectedLegendIds: [...state.selectedLegendIds],
        };
      }

    case 'deselect-legend':
      if (state.selectedLegendIds.indexOf(action.legendId) === -1) {
        return {
          ...state,
          ...defaultSpacingState,
          selectedLegendIds: [...state.selectedLegendIds],
        };
      } else {
        return {
          ...state,
          ...defaultSpacingState,
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
        ...defaultSpacingState,
        selectedLegendIds: state.textPack.legends.annotations.map(l => l.id),
      };

    case 'deselect-all-legend':
      return {
        ...state,
        ...defaultSpacingState,
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
          ...defaultSpacingState,
          selectedLegendAttributeIds: [
            ...state.selectedLegendAttributeIds,
            attributeId(action.legendId, action.attributeId),
          ],
        };
      } else {
        return {
          ...state,
          ...defaultSpacingState,
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
          ...defaultSpacingState,
          selectedLegendAttributeIds: [...state.selectedLegendAttributeIds],
        };
      } else {
        return {
          ...state,
          ...defaultSpacingState,
          selectedLegendAttributeIds: state.selectedLegendAttributeIds.filter(
            id => id !== attributeId(action.legendId, action.attributeId)
          ),
        };
      }

    case 'set-spaced-annotation-span':
      return {
        ...state,
        spacingCalcuated: true,
        spacedAnnotationSpan: action.spacedAnnotationSpan,
        spacedText: action.spacedText,
      };
  }
}

export function attributeId(legendId: string, attributeId: string) {
  return legendId + '_' + attributeId;
}

const [
  TextViewerProvider,
  useTextViewerState,
  useTextViewerDispatch,
] = createContextProvider(textViewerReducer, initialState);

export { TextViewerProvider, useTextViewerState, useTextViewerDispatch };
