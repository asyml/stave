import {createContextProvider} from '../lib/create-context-provider';
import {IAnnotationPosition, IOntology, ISinglePack} from '../lib/interfaces';
import {attributeId} from '../lib/utils';

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
  halfSelectedAnnotationIds: string[]; // indicate a state that annotation is keep highlighted when link is selected
  highlightedAnnotationIds: string[];

  selectedLinkId: string | null;
  halfSelectedLinkIds: string[]; // indicate a state that link is keep highlighted when annotation is selected
  highlightedLinkIds: string[];

  spacingCalculated: boolean;
  spacedText: string | null;
  charMoveMap: Map<number, number>;
  collapsedLineIndexes: number[];
  annotationPositions: IAnnotationPosition[];
  textNodeWidth: number;

  linkEditFromEntryId: string | null;
  linkEditToEntryId: string | null;
  linkEditIsDragging: boolean;
  linkEditIsCreating: boolean;
  linkEditSelectedLegendId: string | null;

  annoEditIsCreating: boolean;
  annoEditCursorBegin: number | null;
  annoEditCursorEnd: number | null;
  annoEditSelectedLegendId: string | null;

  jumpToAnnotation: string | null;

  selectedScopeId: string | null; // scope id is is legend id
  selectedScopeIndex: number; // scope id is is legend id
};

const initialSpacingState = {
  spacingCalculated: false,
  spacedText: null,
  spacedAnnotationSpan: {},
  charMoveMap: new Map(),
  annotationPositions: [],
  textNodeWidth: 0,
  jumpToAnnotation: null,
};

const initialLinkEditState = {
  linkEditFromEntryId: null,
  linkEditToEntryId: null,
  linkEditIsDragging: false,
  linkEditIsCreating: false,
  linkEditSelectedLegendId: null,
};

const initialAnnoEditState = {
  annoEditIsCreating: false,
  annoEditCursorBegin: null,
  annoEditCursorEnd: null,
  annoEditSelectedLegendId: null,
};

const initialUserSelectState = {
  selectedAnnotationId: null,
  halfSelectedAnnotationIds: [],
  highlightedAnnotationIds: [],

  selectedLinkId: null,
  halfSelectedLinkIds: [],
  highlightedLinkIds: [],
};

const initialState: State = {
  textPack: null,
  ontology: null,
  selectedLegendIds: [],
  selectedLegendAttributeIds: [],

  collapsedLineIndexes: [],

  ...initialUserSelectState,
  ...initialLinkEditState,
  ...initialSpacingState,
  ...initialAnnoEditState,

  selectedScopeId: null,
  selectedScopeIndex: 0,
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
      type: 'delete-annotation';
      annotationId: string;
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
      spacedText: string;
      charMoveMap: Map<number, number>;
      annotationPositions: IAnnotationPosition[];
      textNodeWidth: number;
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
      type: 'delete-link';
      linkId: string;
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      enteredAttributes?: Record<number, any>;
    }
  | {
      type: 'cancel-create-link';
    }
  | {
      type: 'stop-create-link-dragging';
      hasMoved: boolean;
    }
  | {
      type: 'link-edit-select-legend-type';
      legendId: string;
    }
  | {
      type: 'start-annotation-edit';
    }
  | {
      type: 'exit-annotation-edit';
    }
  | {
      type: 'annotation-edit-set-begin';
      begin: number;
    }
  | {
      type: 'annotation-edit-set-end';
      end: number;
    }
  | {
      type: 'annotation-edit-cancel';
    }
  | {
      type: 'annotation-edit-select-legend-type';
      legendId: string;
    }
  | {
      type: 'annotation-edit-select-text';
      begin: number;
      end: number;
    }
  | {
      type: 'annotation-edit-submit';
    }
  | {
      type: 'jump-to-annotation';
      annotationId: string;
    }
  | {
      type: 'jump-to-annotation-done';
    }
  | {
      type: 'add-member-to-group';
      groupId: string;
      memberId: string;
    }
  | {
      type: 'set-scope';
      scopeId: string | null;
    }
  | {type: 'prev-scope-item'}
  | {type: 'next-scope-item'};

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
        ...initialSpacingState,
        // textPack: action.textPack,
        textPack: {
          ...action.textPack,

          // Validate spans.
          annotations: action.textPack.annotations.map(anno => {
            const text = action.textPack.text;

            const begin = Math.min(text.length, Math.max(0, anno.span.begin));
            const end = Math.min(text.length, Math.max(0, anno.span.end));

            return {
              ...anno,
              span: {begin, end},
            };
          }),
        },

        // // TODO: remove the following test code
        selectedLegendIds: state.textPack
          ? state.selectedLegendIds
          : [
              // 'forte.data.ontology.base_ontology.Sentence',
              // 'forte.data.ontology.ontonotes_ontology.PredicateMention',
              // 'forte.data.ontology.base_ontology.PredicateArgument',
              // 'forte.data.ontology.base_ontology.PredicateLink',
              // 'forte.data.ontology.base_ontology.CoreferenceGroup',
              // 'forte.data.ontology.base_ontology.Token',
              // 'forte.data.ontology.base_ontology.CoreferenceMention',
              // 'forte.data.ontology.base_ontology.CoreferenceGroup2',
            ],
        selectedLegendAttributeIds: state.textPack
          ? state.selectedLegendAttributeIds
          : [
              // attributeId(
              //   'forte.data.ontology.stanfordnlp_ontology.Token',
              //   'pos_tag'
              // ),
              // attributeId('forte.data.ontology.stanfordnlp_ontology.Foo', 'name'),
              // attributeId(action.textPack.legends.links[0].id, 'rel_type'),
              // attributeId(
              //   'forte.onto.base_ontology.PredicateMention',
              //   'pred_type'
              // ),
              // attributeId(
              //   'forte.onto.base_ontology.PredicateLink',
              //   'arg_type'
              // ),
              // attributeId('forte.data.ontology.base_ontology.Token', 'pos_tag'),
            ],

        // selectedAnnotationId: '5',
        // selectedGroupIds: action.textPack.groups.map(g => g.id),
        // collapsedLineIndexes: [],

        // test linkEditIsCreating
        // linkEditFromEntryId:
        //   'forte.data.ontology.stanfordnlp_ontology.Token.19',
        // linkEditToEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.11',
        // linkEditIsCreating: true,

        // annoEditIsCreating: true,
        // selectedGroupId: 'group_1',
      };

    case 'set-ontology':
      return {
        ...state,
        ...initialSpacingState,
        ontology: action.ontology,
      };

    case 'select-legend':
      if (state.selectedLegendIds.indexOf(action.legendId) === -1) {
        return {
          ...state,
          ...initialSpacingState,
          selectedLegendIds: [...state.selectedLegendIds, action.legendId],
        };
      } else {
        return {
          ...state,
          ...initialSpacingState,
          selectedLegendIds: [...state.selectedLegendIds],
        };
      }

    case 'deselect-legend':
      if (state.selectedLegendIds.indexOf(action.legendId) === -1) {
        return {
          ...state,
          ...initialSpacingState,
          selectedLegendIds: [...state.selectedLegendIds],
        };
      } else {
        return {
          ...state,
          ...initialSpacingState,
          selectedLegendIds: state.selectedLegendIds.filter(
            id => id !== action.legendId
          ),
        };
      }

    case 'select-all-legend':
      if (!state.textPack || !state.ontology) {
        return state;
      }

      return {
        ...state,
        ...initialSpacingState,
        selectedLegendIds: state.ontology.definitions.map(
          entry => entry.entryName
        ),
      };

    case 'deselect-all-legend':
      return {
        ...state,
        ...initialSpacingState,
        selectedLegendIds: [],
      };

    case 'select-annotation': {
      if (state.linkEditIsCreating && !state.linkEditToEntryId) {
        return {
          ...state,
          linkEditToEntryId: action.annotationId,
        };
      }

      // if (state.groupEditIsCreating) {
      //   const groupEditAnnotationIds = [...state.groupEditAnnotationIds];

      //   if (groupEditAnnotationIds.includes(action.annotationId)) {
      //     return {
      //       ...state,
      //       groupEditAnnotationIds: state.groupEditAnnotationIds.filter(
      //         id => id !== action.annotationId
      //       ),
      //     };
      //   } else {
      //     groupEditAnnotationIds.push(action.annotationId);

      //     return {
      //       ...state,
      //       groupEditAnnotationIds,
      //     };
      //   }
      // }

      const halfSelectedAnnotationIds: string[] = [];
      const halfSelectedLinkIds: string[] = [];

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

    case 'highlight-annotation': {
      if (state.linkEditIsDragging) {
        return {
          ...state,
          highlightedAnnotationIds: [action.annotationId],
        };
      }

      const highlightedAnnotationIds: string[] = [];
      const highlightedLinkIds: string[] = [];

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
    }

    case 'unhighlight-annotation':
      return {
        ...state,
        highlightedAnnotationIds: [],
        highlightedLinkIds: [],
      };

    case 'delete-annotation': {
      if (!state.textPack) {
        return state;
      }

      const annotations = state.textPack.annotations.filter(
        ann => ann.id !== action.annotationId
      );

      const links = state.textPack.links.filter(
        link =>
          link.fromEntryId !== action.annotationId &&
          link.toEntryId !== action.annotationId
      );

      const removedLinkIds = state.textPack.links
        .filter(
          link =>
            link.fromEntryId === action.annotationId ||
            link.toEntryId === action.annotationId
        )
        .map(l => l.id);

      const groups = state.textPack.groups.map(group => {
        const filteredMemberIds = group.members.filter(id => {
          if (group.memberType === 'annotation') {
            return id !== action.annotationId;
          } else if (group.memberType === 'link') {
            return removedLinkIds.includes(id);
          } else {
            throw new Error('invalid member type ' + group.memberType);
          }
        });

        return {
          ...group,
          members: filteredMemberIds,
        };
      });

      return {
        ...state,
        ...initialSpacingState,
        textPack: {
          ...state.textPack,
          annotations,
          links,
          groups,
        },
      };
    }

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
        ...initialSpacingState,
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
        ...initialSpacingState,
        selectedLegendAttributeIds,
      };
    }

    case 'reset-calculated-text-space':
      return {
        ...state,
        ...initialSpacingState,
      };

    case 'set-spaced-annotation-span':
      return {
        ...state,
        spacingCalculated: true,
        spacedText: action.spacedText,
        charMoveMap: action.charMoveMap,
        annotationPositions: action.annotationPositions,
        textNodeWidth: action.textNodeWidth,
      };

    case 'collapse-line':
      if (state.collapsedLineIndexes.indexOf(action.lineIndex) > -1) {
        return state;
      }
      return {
        ...state,
        ...initialSpacingState,
        collapsedLineIndexes: [...state.collapsedLineIndexes, action.lineIndex],
      };

    case 'uncollapse-line':
      if (state.collapsedLineIndexes.indexOf(action.lineIndex) === -1) {
        return state;
      }
      return {
        ...state,
        ...initialSpacingState,
        collapsedLineIndexes: state.collapsedLineIndexes.filter(
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

    case 'delete-link': {
      if (!state.textPack) {
        return state;
      }

      const links = state.textPack.links.filter(
        link => link.id !== action.linkId
      );

      const groups = state.textPack.groups.map(group => {
        if (group.memberType === 'link') {
          const filteredMemberIds = group.members.filter(() => !action.linkId);
          return {
            ...group,
            members: filteredMemberIds,
          };
        } else {
          return group;
        }
      });

      return {
        ...state,
        ...initialSpacingState,
        textPack: {
          ...state.textPack,
          links,
          groups,
        },
      };
    }

    case 'start-create-link':
      if (state.linkEditIsCreating) {
        if (state.linkEditFromEntryId === action.annotationId) {
          return {
            ...state,
            ...initialLinkEditState,
          };
        } else {
          return state;
        }
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
        ...initialLinkEditState,
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
      if (
        state.linkEditToEntryId &&
        state.linkEditFromEntryId &&
        state.linkEditSelectedLegendId
      ) {
        return {
          ...state,
          linkEditIsDragging: false,
          linkEditIsCreating: false,
          linkEditFromEntryId: null,
          linkEditToEntryId: null,
        };
      } else {
        return {
          ...state,
          ...initialLinkEditState,
          linkEditSelectedLegendId: state.linkEditSelectedLegendId,
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

    case 'link-edit-select-legend-type':
      return {
        ...state,
        linkEditSelectedLegendId: action.legendId,
      };

    case 'start-annotation-edit':
      return {
        ...state,
        ...initialLinkEditState,
        ...initialUserSelectState,
        // ...initialGroupEditState,
        annoEditIsCreating: true,
      };

    case 'exit-annotation-edit':
      return {
        ...state,
        ...initialAnnoEditState,
      };

    case 'annotation-edit-set-begin':
      return {
        ...state,
        annoEditCursorBegin: action.begin,
      };

    case 'annotation-edit-set-end': {
      if (
        state.annoEditCursorBegin !== null &&
        state.annoEditCursorBegin > action.end
      ) {
        return {
          ...state,
          annoEditCursorBegin: action.end,
        };
      } else {
        return {
          ...state,
          annoEditCursorEnd: action.end,
        };
      }
    }
    case 'annotation-edit-cancel': {
      return {
        ...state,
        ...initialAnnoEditState,
        annoEditIsCreating: true,
      };
    }

    case 'annotation-edit-select-text': {
      return {
        ...state,
        annoEditCursorBegin: action.begin,
        annoEditCursorEnd: action.end,
      };
    }

    case 'annotation-edit-select-legend-type':
      return {
        ...state,
        annoEditSelectedLegendId: action.legendId,
      };

    case 'annotation-edit-submit': {
      return {
        ...state,
        annoEditCursorBegin: null,
        annoEditCursorEnd: null,
      };
    }

    case 'jump-to-annotation': {
      return {
        ...state,
        jumpToAnnotation: action.annotationId,
      };
    }

    case 'jump-to-annotation-done': {
      return {
        ...state,
        jumpToAnnotation: null,
      };
    }

    case 'add-member-to-group': {
      const textPack = state.textPack as ISinglePack;
      const groups = textPack.groups.map(g => {
        if (g.id === action.groupId) {
          return {
            ...g,
            members: [...g.members, action.memberId],
          };
        } else {
          return g;
        }
      });

      return {
        ...state,
        textPack: {
          ...textPack,
          groups,
        },
      };
    }

    case 'set-scope': {
      return {
        ...state,
        ...initialSpacingState,
        selectedScopeIndex: 0,
        selectedScopeId: action.scopeId,
      };
    }

    case 'prev-scope-item': {
      const prevScopeIndex =
        state.selectedScopeIndex <= 0 ? 0 : state.selectedScopeIndex - 1;

      return {
        ...state,
        ...initialSpacingState,
        selectedScopeIndex: prevScopeIndex,
      };
    }

    case 'next-scope-item': {
      if (!state.textPack) return state;

      const scopeAnnotations = state.textPack.annotations.filter(
        ann => ann.legendId === state.selectedScopeId
      );
      const prevScopeIndex =
        state.selectedScopeIndex >= scopeAnnotations.length
          ? 0
          : state.selectedScopeIndex + 1;

      return {
        ...state,
        ...initialSpacingState,
        selectedScopeIndex: prevScopeIndex,
      };
    }
  }
}

let __currentState: State = initialState;

function storeCurrentStateReducer(state: State): State {
  __currentState = state;
  return state;
}

function combineReducers(...reducers: Array<typeof textViewerReducer>) {
  return (state: State, action: Action) => {
    reducers.forEach(reducer => {
      state = reducer(state, action);
    });

    return state;
  };
}

function getState() {
  return __currentState;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const w: any = window;
w.getState = getState;

const [
  TextViewerProvider,
  useTextViewerState,
  useTextViewerDispatch,
] = createContextProvider(
  combineReducers(textViewerReducer, storeCurrentStateReducer),
  initialState
);

export {
  TextViewerProvider,
  useTextViewerState,
  useTextViewerDispatch,
  getState,
};
