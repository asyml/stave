import {IProjectConfigs} from '../nlpviewer';
//import { layout } from './layout'

export const projectConfig: IProjectConfigs = {
  legendConfigs: {
    'edu.cmu.TitleSpan': {is_selected: false, is_shown: true},
    'edu.cmu.BodySpan': {is_selected: false, is_shown: true},
    'edu.cmu.EventMention': {is_selected: true, is_shown: true},
    'ft.onto.base_ontology.Token': {
      is_selected: false,
      is_shown: true,
      attributes: {
        pos: false,
      },
    },
    'ft.onto.base_ontology.EntityMention': {
      is_selected: false,
      is_shown: true,
    },
    'ft.onto.base_ontology.EventMention': {
      is_selected: true,
      is_shown: true,
    },
    'ft.onto.base_ontology.PredicateMention': {
      is_selected: false,
      is_shown: true,
    },
    'ft.onto.base_ontology.PredicateArgument': {
      is_selected: false,
      is_shown: true,
    },
    'ft.onto.base_ontology.PredicateLink': {
      is_selected: false,
      is_shown: true,
    },
    'ft.onto.base_ontology.Dependency': {
      is_selected: false,
      is_shown: true,
    },
  },
  scopeConfigs: {
    'ft.onto.base_ontology.Sentence': true,
  },
  layoutConfigs: {
    'center-middle': 'default-nlp',
    left: 'default-meta',
    right: 'default-attribute',
  },
  pipelineUrl: null,
};
