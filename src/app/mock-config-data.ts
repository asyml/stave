import { IOntology } from '../nlpviewer';

export const ontology: IOntology = {    
      name: "base_ontology",
      definitions: [
        {
          entryName: "ft.onto.base_ontology.Token",
          parentEntryName: "forte.data.ontology.top.Annotation",
          description: "A span based annotation :class:`Token`, used to represent a token or a word.",
          attributes: [
            {
              name: "pos",
              type: "str"
            },
            {
              name: "ud_xpos",
              type: "str",
              description: "Language specific pos tag. Used in CoNLL-U Format. Refer to https://universaldependencies.org/format.html"
            },
            {
              name: "lemma",
              type: "str",
              description: "Lemma or stem of word form."
            },
            {
              name: "chunk",
              type: "str"
            },
            {
              name: "ner",
              type: "str"
            },
            {
              name: "sense",
              type: "str"
            },
            {
              name: "is_root",
              type: "bool"
            },
            {
              name: "ud_features",
              type: "Dict",
              keyType: "str",
              valueType: "str"
            },
            {
              name: "ud_misc",
              type: "Dict",
              keyType: "str",
              valueType: "str"
            }
          ]
        },
        {
          entryName: "ft.onto.base_ontology.Document",
          parentEntryName: "forte.data.ontology.top.Annotation",
          description: "A span based annotation `Document`, normally used to represent a document."
        },
        {
          entryName: "ft.onto.base_ontology.Sentence",
          parentEntryName: "forte.data.ontology.top.Annotation",
          description: "A span based annotation `Sentence`, normally used to represent a sentence.",
          attributes: [
            {
              name: "speaker",
              type: "str"
            },
            {
              name: "part_id",
              type: "int"
            },
            {
              name: "sentiment",
              type: "Dict",
              keyType: "str",
              valueType: "float"
            }
          ]
        },
        {
          entryName: "ft.onto.base_ontology.Phrase",
          parentEntryName: "forte.data.ontology.top.Annotation",
          description: "A span based annotation `Phrase`.",
          attributes: [
            {
              name: "phrase_type",
              type: "str"
            }
          ]
        },
        {
          entryName: "ft.onto.base_ontology.Utterance",
          parentEntryName: "forte.data.ontology.top.Annotation",
          description: "A span based annotation `Utterance`, normally used to represent an utterance in dialogue."
        },
        {
          entryName: "ft.onto.base_ontology.PredicateArgument",
          parentEntryName: "forte.data.ontology.top.Annotation",
          description: "A span based annotation `PredicateArgument`, normally used to represent an argument of a predicate, can be linked to the predicate via the predicate link.",
          attributes: [
            {
              name: "ner_type",
              type: "str"
            },
            {
              name: "predicate_lemma",
              type: "str"
            },
            {
              name: "is_verb",
              type: "bool"
            }
          ]
        },
        {
          entryName: "ft.onto.base_ontology.EntityMention",
          parentEntryName: "forte.data.ontology.top.Annotation",
          description: "A span based annotation `EntityMention`, normally used to represent an Entity Mention in a piece of text.",
          attributes: [
            {
              name: "ner_type",
              type: "str"
            }
          ]
        },
        {
          entryName: "ft.onto.base_ontology.EventMention",
          parentEntryName: "forte.data.ontology.top.Annotation",
          description: "A span based annotation `EventMention`, used to refer to a mention of an event.",
          attributes: [
            {
              name: "event_type",
              type: "str"
            }
          ]
        },
        {
          entryName: "ft.onto.base_ontology.PredicateMention",
          parentEntryName: "forte.data.ontology.top.Annotation",
          description: "A span based annotation `PredicateMention`, normally used to represent a predicate (normally verbs) in a piece of text.",
          attributes: [
            {
              name: "predicate_lemma",
              type: "str"
            },
            {
              name: "framenet_id",
              type: "str"
            },
            {
              name: "is_verb",
              type: "bool"
            }
          ]
        },
        {
          entryName: "ft.onto.base_ontology.PredicateLink",
          parentEntryName: "forte.data.ontology.top.Link",
          description: "A `Link` type entry which represent a semantic role link between a predicate and its argument.",
          attributes: [
            {
              name: "arg_type",
              type: "str",
              description: "The predicate link type."
            }
          ],
          parentType: "ft.onto.base_ontology.PredicateMention",
          childType: "ft.onto.base_ontology.PredicateArgument"
        },
        {
          entryName: "ft.onto.base_ontology.Dependency",
          parentEntryName: "forte.data.ontology.top.Link",
          description: "A `Link` type entry which represent a syntactic dependency.",
          attributes: [
            {
              name: "dep_label",
              type: "str",
              description: "The dependency label."
            },
            {
              name: "rel_type",
              type: "str"
            }
          ],
          parentType: "ft.onto.base_ontology.Token",
          childType: "ft.onto.base_ontology.Token"
        },
        {
          entryName: "ft.onto.base_ontology.EnhancedDependency",
          parentEntryName: "forte.data.ontology.top.Link",
          description: "A `Link` type entry which represent a enhanced dependency: \n https://universaldependencies.org/u/overview/enhanced-syntax.html",
          attributes: [
            {
              name: "dep_label",
              type: "str",
              description: "The enhanced dependency label in Universal Dependency."
            }
          ],
          parentType: "ft.onto.base_ontology.Token",
          childType: "ft.onto.base_ontology.Token"
        },
        {
          entryName: "ft.onto.base_ontology.RelationLink",
          parentEntryName: "forte.data.ontology.top.Link",
          description: "A `Link` type entry which represent a relation between two entity mentions",
          attributes: [
            {
              name: "rel_type",
              type: "str",
              description: "The type of the relation."
            }
          ],
          parentType: "ft.onto.base_ontology.EntityMention",
          childType: "ft.onto.base_ontology.EntityMention"
        },
        {
          entryName: "ft.onto.base_ontology.CoreferenceGroup",
          parentEntryName: "forte.data.ontology.top.Group",
          description: "A group type entry that take `EntityMention`, as members, used to represent coreferent group of entities.",
          memberType: "ft.onto.base_ontology.EntityMention"
        },
        {
          entryName: "ft.onto.base_ontology.EventRelation",
          parentEntryName: "forte.data.ontology.top.Link",
          description: "A `Link` type entry which represent a relation between two event mentions.",
          attributes: [
            {
              name: "rel_type",
              type: "str",
              description: "The type of the relation."
            }
          ],
          parentType: "ft.onto.base_ontology.EventMention",
          childType: "ft.onto.base_ontology.EventMention"
        }
      ],
      constraints: {
        /**
         *
         * Token's attribute 'pos_tag', only contains 'pt1', 'pt2', 'pt3', 'pt4'
         *
         */
        'forte.data.ontology.base_ontology.Token': [
          {
            attributes: {
              pos_tag: ['pt1', 'pt2', 'pt3', 'pt4'],
            },
          },
        ],
    
        /**
         *
         * PredicateMention's attribute 'pred_type', only contains 'pt1', 'pt2', 'pt3', 'pt4'
         *
         */
    
        'forte.data.ontology.ontonotes_ontology.PredicateMention': [
          {
            attributes: {
              pred_type: ['pt1', 'pt2', 'pt3', 'pt4'],
            },
          },
        ],
    
        /**
         *
         * PredicateLink's parentType must be entry that
         *  - has legendId 'forte.data.ontology.ontonotes_ontology.PredicateMention'
         *  - attributes pred_type to be 'pt1' or 'pt2'
         * also childType must be entry that
         *  - has legendId 'forte.data.ontology.base_ontology.PredicateArgument
         *
         * PredicateLink can also be that, parentType must be entry that
         *  - has legendId 'forte.data.ontology.ontonotes_ontology.PredicateMention'
         *  - attributes pred_type to be 'pt3' or 'pt4'
         * also childType must be entry that
         *  - has legendId 'forte.data.ontology.base_ontology.Token
         *
         */
    
        'forte.data.ontology.base_ontology.PredicateLink': [
          {
            parentType: {
              legendId: ['forte.data.ontology.ontonotes_ontology.PredicateMention'],
              attributes: {
                pred_type: ['pt1', 'pt2'],
              },
            },
            childType: {
              legendId: ['forte.data.ontology.base_ontology.PredicateArgument'],
            },
          },
          {
            parentType: {
              legendId: ['forte.data.ontology.ontonotes_ontology.PredicateMention'],
              attributes: {
                pred_type: ['pt3', 'pt4'],
              },
            },
            childType: {
              legendId: ['forte.data.ontology.base_ontology.Token'],
            },
          },
        ]
      }
};
