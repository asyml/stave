import {IProjectConfigs} from '../nlpviewer'

export const projectConfig: IProjectConfigs = {
  legendConfigs: {
    "edu.cmu.TitleSpan": {is_selected: false},
    "edu.cmu.BodySpan": {is_selected: false},
    "edu.cmu.EventMention": {is_selected: true},
    "ft.onto.base_ontology.Token": {
      is_selected: false,
      attributes: {
        'pos': false,
      },
    },
    "ft.onto.base_ontology.EntityMention": {
      is_selected: false        
    },
    "ft.onto.base_ontology.EventMention": {
      is_selected: true        
    },
    "ft.onto.base_ontology.PredicateMention": {
      is_selected: false        
    },
    "ft.onto.base_ontology.PredicateArgument": {
      is_selected: false        
    },
    "ft.onto.base_ontology.PredicateLink": {
      is_selected: false        
    },
    "ft.onto.base_ontology.Dependency": {
      is_selected: false        
    }
  },
  scopeConfigs: {
    "ft.onto.base_ontology.Sentence": true,
  }
}

