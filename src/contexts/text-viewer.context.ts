import {
  ISinglePack,
  IOntology,
  ISpacedAnnotationSpan,
} from '../lib/interfaces';
import { createContextProvider } from '../lib/create-context-provider';
import { attributeId } from '../lib/utils';

export type Dispatch = (action: Action) => void;

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
  // indicate a state that annotation is keep highlighted when link is selected
  halfSelectedAnnotationIds: string[];
  highlightedAnnotationIds: string[];

  selectedLinkId: string | null;
  // indicate a state that link is keep highlighted when annotation is selected
  halfSelectedLinkIds: string[];
  highlightedLinkIds: string[];

  spacingCalcuated: boolean;
  spacedAnnotationSpan: ISpacedAnnotationSpan;
  spacedText: string | null;
  collpasedLineIndexes: number[];

  linkEditFromEntryId: string | null;
  linkEditToEntryId: string | null;
  linkEditIsDragging: boolean;
  linkEditIsCreating: boolean;
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
  halfSelectedAnnotationIds: [],
  highlightedAnnotationIds: [],

  selectedLinkId: null,
  halfSelectedLinkIds: [],
  highlightedLinkIds: [],

  linkEditFromEntryId: null,
  linkEditToEntryId: null,
  linkEditIsDragging: false,
  linkEditIsCreating: false,

  collpasedLineIndexes: [],
  ...defaultSpacingState,
};

/**
 *
 *
 * The actions
 *
 *
 */

export type Action =
  | {
      type: 'set-text-pack';
      textPack: ISinglePack;
    }
  | {
      type: 'set-ontology';
      ontology: IOntology;
    }
  | {
      type: 'select-legend';
      legendId: string;
    }
  | {
      type: 'deselect-legend';
      legendId: string;
    }
  | {
      type: 'select-all-legend';
    }
  | {
      type: 'deselect-all-legend';
    }
  | {
      type: 'select-annotation';
      annotationId: string;
    }
  | {
      type: 'deselect-annotation';
    }
  | {
      type: 'highlight-annotation';
      annotationId: string;
    }
  | {
      type: 'unhighlight-annotation';
    }
  | {
      type: 'reset-calculated-text-space';
    }
  | {
      type: 'select-legend-attribute';
      legendId: string;
      attributeId: string;
    }
  | {
      type: 'set-spaced-annotation-span';
      spacedAnnotationSpan: ISpacedAnnotationSpan;
      spacedText: string;
    }
  | {
      type: 'deselect-legend-attribute';
      legendId: string;
      attributeId: string;
    }
  | {
      type: 'collapse-line';
      lineIndex: number;
    }
  | {
      type: 'uncollapse-line';
      lineIndex: number;
    }
  | {
      type: 'select-link';
      linkId: string;
    }
  | {
      type: 'deselect-link';
    }
  | {
      type: 'highlight-link';
      linkId: string;
    }
  | {
      type: 'unhighlight-link';
    }
  | {
      type: 'start-create-link';
      annotationId: string;
    }
  | {
      type: 'set-create-link-target';
      annotationId: string | null;
    }
  | {
      type: 'end-create-link';
    }
  | {
      type: 'cancel-create-link';
    }
  | {
      type: 'stop-create-link-dragging';
      hasMoved: boolean;
    };

/**
 *
 *
 * The reducer
 *
 *
 */

function textViewerReducer(state: State, action: Action): State {
  // ll('reducer', action);

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
          attributeId(action.textPack.legends.links[0].id, 'rel_type'),
        ],
        // selectedAnnotationId:
        //   'forte.data.ontology.stanfordnlp_ontology.Token.6',
        collpasedLineIndexes: [],
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

    case 'select-annotation': {
      if (state.linkEditIsCreating && !state.linkEditToEntryId) {
        return {
          ...state,
          linkEditToEntryId: action.annotationId,
        };
      }

      let halfSelectedAnnotationIds: string[] = [];
      let halfSelectedLinkIds: string[] = [];

      if (state.textPack) {
        state.textPack.links.forEach(link => {
          if (link.fromEntryId === action.annotationId) {
            halfSelectedLinkIds.push(link.id);
            halfSelectedAnnotationIds.push(link.toEntryId);
            return;
          }

          if (link.toEntryId === action.annotationId) {
            halfSelectedLinkIds.push(link.id);
            halfSelectedAnnotationIds.push(link.fromEntryId);
            return;
          }
        });
      }

      return {
        ...state,
        selectedAnnotationId: action.annotationId,
        selectedLinkId: null,
        halfSelectedAnnotationIds: halfSelectedAnnotationIds,
        halfSelectedLinkIds: halfSelectedLinkIds,
      };
    }

    case 'deselect-annotation':
      return {
        ...state,
        selectedAnnotationId: null,
        halfSelectedAnnotationIds: [],
        halfSelectedLinkIds: [],
      };

    case 'highlight-annotation':
      if (state.linkEditIsDragging) {
        return {
          ...state,
          highlightedAnnotationIds: [action.annotationId],
        };
      }

      let highlightedAnnotationIds: string[] = [];
      let highlightedLinkIds: string[] = [];

      if (state.textPack) {
        state.textPack.links.forEach(link => {
          if (link.fromEntryId === action.annotationId) {
            highlightedLinkIds.push(link.id);
            highlightedAnnotationIds.push(link.toEntryId);
            return;
          }

          if (link.toEntryId === action.annotationId) {
            highlightedLinkIds.push(link.id);
            highlightedAnnotationIds.push(link.fromEntryId);
            return;
          }
        });
      }

      return {
        ...state,
        highlightedAnnotationIds: [
          action.annotationId,
          ...highlightedAnnotationIds,
        ],
        highlightedLinkIds: highlightedLinkIds,
      };

    case 'unhighlight-annotation':
      return {
        ...state,
        highlightedAnnotationIds: [],
        highlightedLinkIds: [],
      };

    case 'select-legend-attribute': {
      const selectedLegendAttributeIds = state.selectedLegendAttributeIds.filter(
        id => {
          return id.indexOf(action.legendId) !== 0;
        }
      );
      selectedLegendAttributeIds.push(
        attributeId(action.legendId, action.attributeId)
      );

      return {
        ...state,
        ...defaultSpacingState,
        selectedLegendAttributeIds,
      };
    }

    case 'deselect-legend-attribute': {
      const selectedLegendAttributeIds = state.selectedLegendAttributeIds.filter(
        id => {
          return id.indexOf(action.legendId) !== 0;
        }
      );

      return {
        ...state,
        ...defaultSpacingState,
        selectedLegendAttributeIds,
      };
    }

    case 'reset-calculated-text-space':
      return {
        ...state,
        ...defaultSpacingState,
      };

    case 'set-spaced-annotation-span':
      return {
        ...state,
        spacingCalcuated: true,
        spacedAnnotationSpan: action.spacedAnnotationSpan,
        spacedText: action.spacedText,
      };

    case 'collapse-line':
      if (state.collpasedLineIndexes.indexOf(action.lineIndex) > -1) {
        return state;
      }
      return {
        ...state,
        ...defaultSpacingState,
        collpasedLineIndexes: [...state.collpasedLineIndexes, action.lineIndex],
      };

    case 'uncollapse-line':
      if (state.collpasedLineIndexes.indexOf(action.lineIndex) === -1) {
        return state;
      }
      return {
        ...state,
        ...defaultSpacingState,
        collpasedLineIndexes: state.collpasedLineIndexes.filter(
          i => i !== action.lineIndex
        ),
      };

    case 'select-link': {
      if (state.linkEditIsCreating && !state.linkEditToEntryId) {
        return state;
      }

      let halfSelectedAnnotationIds: string[] = [];
      if (state.textPack) {
        const link = state.textPack.links.find(l => l.id === action.linkId);
        if (link) {
          halfSelectedAnnotationIds = [link.fromEntryId, link.toEntryId];
        }
      }

      return {
        ...state,
        selectedLinkId: action.linkId,
        halfSelectedAnnotationIds: halfSelectedAnnotationIds,
        highlightedLinkIds: [],
        halfSelectedLinkIds: [],
        selectedAnnotationId: null,
      };
    }

    case 'deselect-link':
      return {
        ...state,
        selectedLinkId: null,
      };

    case 'highlight-link': {
      if (state.linkEditIsDragging) {
        return state;
      }

      let heighligAnnotationIds = state.highlightedAnnotationIds;
      if (state.textPack) {
        const link = state.textPack.links.find(l => l.id === action.linkId);
        if (link) {
          heighligAnnotationIds = [link.fromEntryId, link.toEntryId];
        }
      }

      return {
        ...state,
        highlightedLinkIds: [action.linkId],
        highlightedAnnotationIds: heighligAnnotationIds,
      };
    }

    case 'unhighlight-link':
      return {
        ...state,
        highlightedLinkIds: [],
        highlightedAnnotationIds: [],
      };

    case 'start-create-link':
      if (state.linkEditIsCreating) {
        return state;
      }

      return {
        ...state,
        linkEditFromEntryId: action.annotationId,
        linkEditIsCreating: true,
        linkEditIsDragging: true,
      };

    case 'cancel-create-link':
      return {
        ...state,
        linkEditIsDragging: false,
        linkEditIsCreating: false,
        linkEditFromEntryId: null,
        linkEditToEntryId: null,
      };

    case 'stop-create-link-dragging':
      if (!action.hasMoved) {
        return {
          ...state,
          linkEditIsDragging: false,
        };
      }

      if (state.linkEditToEntryId) {
        return {
          ...state,
          linkEditIsDragging: false,
        };
      }

      return {
        ...state,
        linkEditIsDragging: false,
        linkEditIsCreating: false,
        linkEditFromEntryId: null,
        linkEditToEntryId: null,
      };

    case 'end-create-link':
      if (state.linkEditToEntryId && state.linkEditFromEntryId) {
        const textPack = state.textPack as ISinglePack;
        return {
          ...state,
          linkEditIsDragging: false,
          linkEditIsCreating: false,
          linkEditFromEntryId: null,
          linkEditToEntryId: null,
          textPack: {
            ...textPack,
            links: [
              ...textPack.links,
              newLink(state.linkEditFromEntryId, state.linkEditToEntryId),
            ],
          },
          ...defaultSpacingState,
        };
      } else {
        return {
          ...state,
          linkEditIsDragging: false,
          linkEditIsCreating: false,
          linkEditFromEntryId: null,
          linkEditToEntryId: null,
        };
      }

    case 'set-create-link-target':
      if (state.linkEditIsDragging) {
        return {
          ...state,
          linkEditToEntryId: action.annotationId,
        };
      } else if (state.linkEditIsCreating) {
        return state;
      } else {
        return {
          ...state,
          linkEditFromEntryId: action.annotationId,
        };
      }
  }
}

const [
  TextViewerProvider,
  useTextViewerState,
  useTextViewerDispatch,
] = createContextProvider(textViewerReducer, initialState);

export { TextViewerProvider, useTextViewerState, useTextViewerDispatch };

function newLink(fromEntryId: string, toEntryId: string) {
  return {
    id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.' + Math.random(),
    legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
    fromEntryId: fromEntryId,
    toEntryId: toEntryId,
    attributes: {
      component: 'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
      'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      rel_type: 'ADDED', // TODO: let use to choose.
      rel_type_2: 'ADDED_2',
    },
  };
}
