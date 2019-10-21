import { IOntology } from './interfaces';

export const ontology: IOntology = {
  "ontologyName": "forte.data.ontology.ontonotes_ontology",
  "imports": [
    "forte.data.ontology.top"
  ],
  "entryDefinitions": [
    {
      "entryName": "forte.data.ontology.base_ontology.Token",
      "parentEntryName": "forte.data.ontology.top.Annotation",
      "attributes": [
        {
          "attributeName": "pos_tag",
          "attributeType": "str"
        }
      ]
    },
    {
      "entryName": "forte.data.ontology.base_ontology.Sentence",
      "parentEntryName": "forte.data.ontology.top.Annotation"
    },
    {
      "entryName": "forte.data.ontology.base_ontology.Document",
      "parentEntryName": "forte.data.ontology.top.Annotation"
    },
    {
      "entryName": "forte.data.ontology.base_ontology.PredicateMention",
      "parentEntryName": "forte.data.ontology.top.Annotation"
    },
    {
      "entryName": "forte.data.ontology.base_ontology.PredicateArgument",
      "parentEntryName": "forte.data.ontology.top.Annotation"
    },
    {
      "entryName": "forte.data.ontology.base_ontology.PredicateLink",
      "parentEntryName": "forte.data.ontology.top.Link",
      "parentType": "forte.data.ontology.base_ontology.PredicateMention",
      "childType": "forte.data.ontology.base_ontology.PredicateArgument",
      "attributes": [
        {
          "attributeName": "arg_type",
          "attributeType": "str"
        }
      ]
    },
    {
      "entryName": "forte.data.ontology.base_ontology.CoreferenceMention",
      "parentEntryName": "forte.data.ontology.top.Annotation"
    },
    {
      "entryName": "forte.data.ontology.base_ontology.CoreferenceGroup",
      "parentEntryName": "forte.data.ontology.top.Group",
      "memberType": "forte.data.ontology.base_ontology.CoreferenceMention"
    },
    {
      "entryName": "forte.data.ontology.base_ontology.EntityMention",
      "parentEntryName": "forte.data.ontology.top.Annotation",
      "attributes": [
        {
          "attributeName": "ner_type",
          "attributeType": "str"
        }
      ]
    },
    {
      "entryName": "forte.data.ontology.ontonotes_ontology.Token",
      "parentEntryName": "forte.data.ontology.base_ontology.Token",
      "attributes": [
        {
          "attributeName": "sense",
          "attributeType": "str"
        }
      ]
    },
    {
      "entryName": "forte.data.ontology.ontonotes_ontology.Sentence",
      "parentEntryName": "forte.data.ontology.base_ontology.Sentence",
      "attributes": [
        {
          "attributeName": "speaker",
          "attributeType": "str"
        },
        {
          "attributeName": "part_id",
          "attributeType": "str"
        }
      ]
    },
    {
      "entryName": "forte.data.ontology.base_ontology.PredicateMention",
      "parentEntryName": "forte.data.ontology.base_ontology.PredicateMention",
      "attributes": [
        {
          "attributeName": "pred_type",
          "attributeType": "str"
        },
        {
          "attributeName": "pred_lemma",
          "attributeType": "str"
        },
        {
          "attributeName": "framenet_id",
          "attributeType": "str"
        }
      ]
    }
  ]
};
