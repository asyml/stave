import {
  ISinglePack,
  IOntology,
  IGroup,
  IAnnotationPosition,
} from '../lib/interfaces';
import { createContextProvider } from '../lib/create-context-provider';
import { attributeId, getGroupType } from '../lib/utils';
import { restorePos } from '../lib/text-spacer';

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
  selectedGroupIds: string[];

  selectedAnnotationId: string | null;
  halfSelectedAnnotationIds: string[]; // indicate a state that annotation is keep highlighted when link is selected
  highlightedAnnotationIds: string[];

  selectedLinkId: string | null;
  halfSelectedLinkIds: string[]; // indicate a state that link is keep highlighted when annotation is selected
  highlightedLinkIds: string[];

  spacingCalcuated: boolean;
  spacedText: string | null;
  charMoveMap: Map<number, number>;
  collpasedLineIndexes: number[];
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

  groupEditIsCreating: boolean;
  groupEditAnnotationIds: string[];
  groupEditLinkIds: string[];
  groupEditSelectedLegendId: string | null;
};

const initialSpacingState = {
  spacingCalcuated: false,
  spacedText: null,
  spacedAnnotationSpan: {},
  charMoveMap: new Map(),
  annotationPositions: [],
  textNodeWidth: 0,
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

const initialGroupEditState = {
  groupEditIsCreating: false,
  groupEditAnnotationIds: [],
  groupEditLinkIds: [],
  groupEditSelectedLegendId: null,
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
  selectedGroupIds: [],

  collpasedLineIndexes: [],

  ...initialUserSelectState,
  ...initialLinkEditState,
  ...initialSpacingState,
  ...initialAnnoEditState,
  ...initialGroupEditState,
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
      type: 'delete-anntation';
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
      enteredAttributes?: Record<number, any>;
    }
  | {
      type: 'select-group';
      groupId: string;
    }
  | {
      type: 'deselect-group';
      groupId: string;
    }
  | {
      type: 'toggle-all-group';
    }
  | {
      type: 'start-add-group';
    }
  | {
      type: 'cancel-add-group';
    }
  | {
      type: 'submit-add-group';
    }
  | {
      type: 'group-edit-select-legend-type';
      legendId: string;
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
        ...initialSpacingState,
        textPack: action.textPack,

        // TODO: remove the following test code
        selectedLegendIds: [
          'forte.data.ontology.ontonotes_ontology.PredicateMention',
          'forte.data.ontology.base_ontology.PredicateArgument',
          'forte.data.ontology.base_ontology.CoreferenceGroup',
          'forte.data.ontology.base_ontology.Token',
          'forte.data.ontology.base_ontology.CoreferenceMention',
          'forte.data.ontology.base_ontology.CoreferenceGroup2',
          action.textPack.legends.links[0].id,
        ],
        selectedLegendAttributeIds: [
          // attributeId(
          //   'forte.data.ontology.stanfordnlp_ontology.Token',
          //   'pos_tag'
          // ),
          // attributeId('forte.data.ontology.stanfordnlp_ontology.Foo', 'name'),
          // attributeId(action.textPack.legends.links[0].id, 'rel_type'),
          attributeId(
            'forte.data.ontology.base_ontology.PredicateLink',
            'arg_type'
          ),
          attributeId('forte.data.ontology.base_ontology.Token', 'pos_tag'),
        ],
        // selectedAnnotationId: '5',
        selectedGroupIds: action.textPack.groups.map(g => g.id),
        // collpasedLineIndexes: [],

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
      if (!state.textPack) {
        return state;
      }

      return {
        ...state,
        ...initialSpacingState,
        selectedLegendIds: state.textPack.legends.annotations.map(l => l.id),
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

      if (state.groupEditIsCreating) {
        const groupEditAnnotationIds = [...state.groupEditAnnotationIds];

        if (groupEditAnnotationIds.includes(action.annotationId)) {
          return {
            ...state,
            groupEditAnnotationIds: state.groupEditAnnotationIds.filter(
              id => id !== action.annotationId
            ),
          };
        } else {
          groupEditAnnotationIds.push(action.annotationId);

          return {
            ...state,
            groupEditAnnotationIds,
          };
        }
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

    case 'delete-anntation': {
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
        spacingCalcuated: true,
        spacedText: action.spacedText,
        charMoveMap: action.charMoveMap,
        annotationPositions: action.annotationPositions,
        textNodeWidth: action.textNodeWidth,
      };

    case 'collapse-line':
      if (state.collpasedLineIndexes.indexOf(action.lineIndex) > -1) {
        return state;
      }
      return {
        ...state,
        ...initialSpacingState,
        collpasedLineIndexes: [...state.collpasedLineIndexes, action.lineIndex],
      };

    case 'uncollapse-line':
      if (state.collpasedLineIndexes.indexOf(action.lineIndex) === -1) {
        return state;
      }
      return {
        ...state,
        ...initialSpacingState,
        collpasedLineIndexes: state.collpasedLineIndexes.filter(
          i => i !== action.lineIndex
        ),
      };

    case 'select-link': {
      if (state.linkEditIsCreating && !state.linkEditToEntryId) {
        return state;
      }

      if (state.groupEditIsCreating) {
        const groupEditLinkIds = [...state.groupEditLinkIds];

        if (groupEditLinkIds.includes(action.linkId)) {
          return {
            ...state,
            groupEditLinkIds: state.groupEditLinkIds.filter(
              id => id !== action.linkId
            ),
          };
        } else {
          groupEditLinkIds.push(action.linkId);
          return {
            ...state,
            groupEditLinkIds,
          };
        }
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
          const filteredMemberIds = group.members.filter(id => !action.linkId);
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
      if (state.linkEditIsCreating || state.groupEditIsCreating) {
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
        const textPack = state.textPack as ISinglePack;
        const linkToAdd = newLink(
          state.linkEditFromEntryId,
          state.linkEditToEntryId,
          state.linkEditSelectedLegendId,
          action.enteredAttributes
        );

        return {
          ...state,
          linkEditIsDragging: false,
          linkEditIsCreating: false,
          linkEditFromEntryId: null,
          linkEditToEntryId: null,
          selectedLinkId: linkToAdd.id,
          textPack: {
            ...textPack,
            links: [...textPack.links, linkToAdd],
          },
          ...initialSpacingState,
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
        ...initialGroupEditState,
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
      if (
        state.annoEditCursorBegin === null ||
        state.annoEditCursorEnd === null ||
        state.annoEditSelectedLegendId === null
      ) {
        throw new Error(
          'cannot create annotation with no begin or end cursor selected'
        );
      }

      const [actualBegin, actualEnd] = restorePos(
        state.charMoveMap,
        state.annoEditCursorBegin,
        state.annoEditCursorEnd
      );

      const newAnno = newAnnotaion(
        actualBegin,
        actualEnd,
        state.annoEditSelectedLegendId,
        action.enteredAttributes
      );

      const textPack = state.textPack as ISinglePack;
      ll('newAnno', newAnno);
      return {
        ...state,
        annoEditCursorBegin: null,
        annoEditCursorEnd: null,
        textPack: {
          ...textPack,
          annotations: [...textPack.annotations, newAnno],
        },
        ...initialSpacingState,
      };
    }

    case 'select-group':
      if (state.selectedGroupIds.includes(action.groupId)) {
        return state;
      } else {
        return {
          ...state,
          selectedGroupIds: [...state.selectedGroupIds, action.groupId],
        };
      }

    case 'deselect-group':
      if (state.selectedGroupIds.includes(action.groupId)) {
        return {
          ...state,
          selectedGroupIds: state.selectedGroupIds.filter(
            groupId => groupId !== action.groupId
          ),
        };
      } else {
        return state;
      }

    case 'toggle-all-group': {
      if (!state.textPack) {
        return state;
      }

      const groupIdToSelect = state.textPack.groups
        .filter(g => state.selectedLegendIds.includes(g.legendId))
        .map(g => g.id);

      if (groupIdToSelect.length === state.selectedGroupIds.length) {
        // if every group are already selected, deselect all
        return {
          ...state,
          selectedGroupIds: [],
        };
      } else {
        return {
          ...state,
          selectedGroupIds: state.textPack.groups
            .filter(g => state.selectedLegendIds.includes(g.legendId))
            .map(g => g.id),
        };
      }
    }

    case 'start-add-group':
      return {
        ...state,
        ...initialUserSelectState,
        ...initialAnnoEditState,
        ...initialLinkEditState,
        selectedGroupIds: [],
        groupEditIsCreating: true,
      };

    case 'cancel-add-group':
      return {
        ...state,
        ...initialGroupEditState,
      };

    case 'group-edit-select-legend-type':
      return {
        ...state,
        groupEditSelectedLegendId: action.legendId,
      };

    case 'submit-add-group': {
      if (!state.groupEditSelectedLegendId) {
        throw new Error('groupEditSelectedLegendId is required');
      }
      if (!state.ontology) {
        throw new Error('ontology is required');
      }

      const memberType = getGroupType(
        state.groupEditSelectedLegendId,
        state.ontology
      );
      const newGroup: IGroup = {
        id: 'group_' + Math.random(),
        attributes: {},
        legendId: state.groupEditSelectedLegendId,
        memberType,
        members:
          memberType === 'annotation'
            ? state.groupEditAnnotationIds
            : state.groupEditLinkIds,
      };

      const textPack = state.textPack as ISinglePack;

      return {
        ...state,
        ...initialGroupEditState,
        selectedGroupIds: [...state.selectedGroupIds, newGroup.id],
        textPack: {
          ...textPack,
          groups: [...textPack.groups, newGroup],
        },
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

function newLink(
  fromEntryId: string,
  toEntryId: string,
  legendId: string,
  attributes: Record<string, any> = {}
) {
  return {
    id: legendId + '.' + Math.random(),
    legendId: legendId,
    fromEntryId: fromEntryId,
    toEntryId: toEntryId,
    attributes: {
      'py/object': legendId,
      ...attributes,
    },
  };
}

function newAnnotaion(
  begin: number,
  end: number,
  legendId: string,
  attributes: Record<string, any> = {}
) {
  return {
    span: {
      begin: begin,
      end: end,
    },
    id: legendId + '.' + Math.random(),
    legendId: legendId,
    attributes: {
      'py/object': legendId,
      ...attributes,
    },
  };
}
