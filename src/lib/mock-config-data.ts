import { IOntology } from './interfaces';

export const ontology: IOntology = {
  ontologyName: 'forte.data.ontology.stanfordnlp_ontology',
  entryDefinitions: [
    {
      entryName: 'forte.data.ontology.stanfordnlp_ontology.Token',
      parentEntryName: 'forte.data.ontology.top.Annotation',
      attributes: [
        {
          attributeName: 'lemma',
          attributeType: 'str',
        },
        {
          attributeName: 'pos_tag',
          attributeType: 'str',
        },
        {
          attributeName: 'upos',
          attributeType: 'str',
        },
        {
          attributeName: 'xpos',
          attributeType: 'str',
        },
      ],
    },
    {
      entryName: 'forte.data.ontology.stanfordnlp_ontology.Sentence',
      parentEntryName: 'forte.data.ontology.top.Annotation',
      attributes: [
        {
          attributeName: 'tokens',
          attributeType: 'List',
          element_type: 'forte.data.ontology.stanfordnlp_ontology.Token',
        },
      ],
    },
    {
      entryName: 'forte.data.ontology.stanfordnlp_ontology.Document',
      parentEntryName: 'forte.data.ontology.top.Annotation',
    },
    {
      entryName: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      parentEntryName: 'forte.data.ontology.top.Link',
      parentType: 'forte.data.ontology.stanfordnlp_ontology.Token',
      childType: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: [
        {
          attributeName: 'rel_type',
          attributeType: 'str',
        },
        {
          attributeName: 'rel_type_2',
          attributeType: 'str',
        },
      ],
    },
    {
      entryName: 'forte.data.ontology.stanfordnlp_ontology.Dependency2',
      parentEntryName: 'forte.data.ontology.top.Link',
      parentType: 'forte.data.ontology.stanfordnlp_ontology.Token',
      childType: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: [
        {
          attributeName: 'rel_type_3',
          attributeType: 'str',
        },
      ],
    },
  ],
};
