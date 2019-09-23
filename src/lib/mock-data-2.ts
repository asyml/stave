import { ISinglePack } from './interfaces';

export const singlePack: ISinglePack = {
  text:
    "The plain green Norway spruce is displayed in the gallery's foyer. Wentworth worked as an assistant to sculptor Henry Moore in the late 1960s. His reputation as a sculptor grew in the 1980s.",
  annotations: [
    {
      span: {
        begin: 0,
        end: 3,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.0',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'det',
        governor: 5,
        lemma: 'the',
        pos_tag: 'DT',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'DET',
        xpos: 'DT',
      },
    },
    {
      span: {
        begin: 0,
        end: 66,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Sentence.0',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Sentence',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Sentence',
        tokens: null,
      },
    },
    {
      span: {
        begin: 0,
        end: 190,
      },
      id: 'forte.data.ontology.base_ontology.Document.0',
      legendId: 'forte.data.ontology.base_ontology.Document',
      attributes: {
        component: 'forte.data.readers.string_reader.StringReader',
        'py/object': 'forte.data.ontology.base_ontology.Document',
      },
    },
    {
      span: {
        begin: 4,
        end: 9,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.1',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'amod',
        governor: 5,
        lemma: 'plain',
        pos_tag: 'JJ',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'ADJ',
        xpos: 'JJ',
      },
    },
    {
      span: {
        begin: 10,
        end: 15,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.2',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'amod',
        governor: 5,
        lemma: 'green',
        pos_tag: 'JJ',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'ADJ',
        xpos: 'JJ',
      },
    },
    {
      span: {
        begin: 16,
        end: 22,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.3',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'compound',
        governor: 5,
        lemma: 'Norway',
        pos_tag: 'NNP',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'PROPN',
        xpos: 'NNP',
      },
    },
    {
      span: {
        begin: 23,
        end: 29,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.4',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'nsubj:pass',
        governor: 7,
        lemma: 'spruce',
        pos_tag: 'NN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'NOUN',
        xpos: 'NN',
      },
    },
    {
      span: {
        begin: 30,
        end: 32,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.5',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'aux:pass',
        governor: 7,
        lemma: 'be',
        pos_tag: 'VBZ',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'AUX',
        xpos: 'VBZ',
      },
    },
    {
      span: {
        begin: 33,
        end: 42,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.6',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'root',
        governor: 0,
        lemma: 'display',
        pos_tag: 'VBN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'VERB',
        xpos: 'VBN',
      },
    },
    {
      span: {
        begin: 43,
        end: 45,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.7',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'case',
        governor: 12,
        lemma: 'in',
        pos_tag: 'IN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'ADP',
        xpos: 'IN',
      },
    },
    {
      span: {
        begin: 46,
        end: 49,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.8',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'det',
        governor: 10,
        lemma: 'the',
        pos_tag: 'DT',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'DET',
        xpos: 'DT',
      },
    },
    {
      span: {
        begin: 50,
        end: 57,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.9',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'nmod:poss',
        governor: 12,
        lemma: 'gallery',
        pos_tag: 'NN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'NOUN',
        xpos: 'NN',
      },
    },
    {
      span: {
        begin: 57,
        end: 59,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.10',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'case',
        governor: 10,
        lemma: "'s",
        pos_tag: 'POS',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'PART',
        xpos: 'POS',
      },
    },
    {
      span: {
        begin: 60,
        end: 65,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.11',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'obl',
        governor: 7,
        lemma: 'foyer',
        pos_tag: 'NN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'NOUN',
        xpos: 'NN',
      },
    },
    {
      span: {
        begin: 65,
        end: 66,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.12',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'punct',
        governor: 7,
        lemma: '.',
        pos_tag: '.',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'PUNCT',
        xpos: '.',
      },
    },
    {
      span: {
        begin: 67,
        end: 76,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.13',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'nsubj',
        governor: 2,
        lemma: 'Wentworth',
        pos_tag: 'NNP',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'PROPN',
        xpos: 'NNP',
      },
    },
    {
      span: {
        begin: 67,
        end: 142,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Sentence.1',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Sentence',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Sentence',
        tokens: null,
      },
    },
    {
      span: {
        begin: 77,
        end: 83,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.14',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'root',
        governor: 0,
        lemma: 'work',
        pos_tag: 'VBD',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'VERB',
        xpos: 'VBD',
      },
    },
    {
      span: {
        begin: 84,
        end: 86,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.15',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'case',
        governor: 5,
        lemma: 'as',
        pos_tag: 'IN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'ADP',
        xpos: 'IN',
      },
    },
    {
      span: {
        begin: 87,
        end: 89,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.16',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'det',
        governor: 5,
        lemma: 'a',
        pos_tag: 'DT',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'DET',
        xpos: 'DT',
      },
    },
    {
      span: {
        begin: 90,
        end: 99,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.17',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'obl',
        governor: 2,
        lemma: 'assistant',
        pos_tag: 'NN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'NOUN',
        xpos: 'NN',
      },
    },
    {
      span: {
        begin: 100,
        end: 102,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.18',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'case',
        governor: 8,
        lemma: 'to',
        pos_tag: 'IN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'ADP',
        xpos: 'IN',
      },
    },
    {
      span: {
        begin: 103,
        end: 111,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.19',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'compound',
        governor: 8,
        lemma: 'sculptor',
        pos_tag: 'NN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'NOUN',
        xpos: 'NN',
      },
    },
    {
      span: {
        begin: 112,
        end: 117,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.20',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'nmod',
        governor: 5,
        lemma: 'Henry',
        pos_tag: 'NNP',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'PROPN',
        xpos: 'NNP',
      },
    },
    {
      span: {
        begin: 118,
        end: 123,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.21',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'flat',
        governor: 8,
        lemma: 'Moore',
        pos_tag: 'NNP',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'PROPN',
        xpos: 'NNP',
      },
    },
    {
      span: {
        begin: 124,
        end: 126,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.22',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'case',
        governor: 13,
        lemma: 'in',
        pos_tag: 'IN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'ADP',
        xpos: 'IN',
      },
    },
    {
      span: {
        begin: 127,
        end: 130,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.23',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'det',
        governor: 13,
        lemma: 'the',
        pos_tag: 'DT',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'DET',
        xpos: 'DT',
      },
    },
    {
      span: {
        begin: 131,
        end: 135,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.24',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'amod',
        governor: 13,
        lemma: 'late',
        pos_tag: 'JJ',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'ADJ',
        xpos: 'JJ',
      },
    },
    {
      span: {
        begin: 136,
        end: 141,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.25',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'obl',
        governor: 2,
        lemma: '1960',
        pos_tag: 'NNS',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'NOUN',
        xpos: 'NNS',
      },
    },
    {
      span: {
        begin: 141,
        end: 142,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.26',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'punct',
        governor: 2,
        lemma: '.',
        pos_tag: '.',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'PUNCT',
        xpos: '.',
      },
    },
    {
      span: {
        begin: 143,
        end: 146,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.27',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'nmod:poss',
        governor: 2,
        lemma: 'he',
        pos_tag: 'PRP$',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'PRON',
        xpos: 'PRP$',
      },
    },
    {
      span: {
        begin: 143,
        end: 190,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Sentence.2',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Sentence',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Sentence',
        tokens: null,
      },
    },
    {
      span: {
        begin: 147,
        end: 157,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.28',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'nsubj',
        governor: 6,
        lemma: 'reputation',
        pos_tag: 'NN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'NOUN',
        xpos: 'NN',
      },
    },
    {
      span: {
        begin: 158,
        end: 160,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.29',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'mark',
        governor: 6,
        lemma: 'as',
        pos_tag: 'IN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'SCONJ',
        xpos: 'IN',
      },
    },
    {
      span: {
        begin: 161,
        end: 162,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.30',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'det',
        governor: 5,
        lemma: 'a',
        pos_tag: 'DT',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'DET',
        xpos: 'DT',
      },
    },
    {
      span: {
        begin: 163,
        end: 171,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.31',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'nsubj',
        governor: 6,
        lemma: 'sculptor',
        pos_tag: 'NN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'NOUN',
        xpos: 'NN',
      },
    },
    {
      span: {
        begin: 172,
        end: 176,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.32',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'root',
        governor: 0,
        lemma: 'grow',
        pos_tag: 'VBD',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'VERB',
        xpos: 'VBD',
      },
    },
    {
      span: {
        begin: 177,
        end: 179,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.33',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'case',
        governor: 9,
        lemma: 'in',
        pos_tag: 'IN',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'ADP',
        xpos: 'IN',
      },
    },
    {
      span: {
        begin: 180,
        end: 183,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.34',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'det',
        governor: 9,
        lemma: 'the',
        pos_tag: 'DT',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'DET',
        xpos: 'DT',
      },
    },
    {
      span: {
        begin: 184,
        end: 189,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.35',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'obl',
        governor: 6,
        lemma: '1980',
        pos_tag: 'NNS',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'NOUN',
        xpos: 'NNS',
      },
    },
    {
      span: {
        begin: 189,
        end: 190,
      },
      id: 'forte.data.ontology.stanfordnlp_ontology.Token.36',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Token',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        dependency_relation: 'punct',
        governor: 2,
        lemma: '.',
        pos_tag: '.',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Token',
        upos: 'PUNCT',
        xpos: '.',
      },
    },
  ],
  links: [
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.0',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.4',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.0',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'det',
        rel_type_2: 'det_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.1',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.4',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.1',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'amod',
        rel_type_2: 'amod_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.2',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.4',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.2',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'amod',
        rel_type_2: 'amod_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.3',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.4',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.3',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'compound',
        rel_type_2: 'compound_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.4',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.6',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.4',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'nsubj:pass',
        rel_type_2: 'nsubj:pass_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.5',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.6',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.5',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'aux:pass',
        rel_type_2: 'aux:pass_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.6',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.12',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.6',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'root',
        rel_type_2: 'root_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.7',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.11',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.7',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'case',
        rel_type_2: 'case_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.8',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.9',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.8',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'det',
        rel_type_2: 'det_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.9',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.11',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.9',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'nmod:poss',
        rel_type_2: 'nmod:poss_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.10',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.9',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.10',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'case',
        rel_type_2: 'case_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.11',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.6',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.11',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'obl',
        rel_type_2: 'obl_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.12',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.6',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.12',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'punct',
        rel_type_2: 'punct_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.13',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.14',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.13',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'nsubj',
        rel_type_2: 'nsubj_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.14',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.26',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.14',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'root',
        rel_type_2: 'root_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.15',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.17',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.15',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'case',
        rel_type_2: 'case_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.16',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.17',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.16',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'det',
        rel_type_2: 'det_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.17',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.14',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.17',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'obl',
        rel_type_2: 'obl_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.18',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.20',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.18',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'case',
        rel_type_2: 'case_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.19',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.20',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.19',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'compound',
        rel_type_2: 'compound_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.20',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.17',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.20',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'nmod',
        rel_type_2: 'nmod_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.21',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.20',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.21',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'flat',
        rel_type_2: 'flat_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.22',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.25',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.22',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'case',
        rel_type_2: 'case_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.23',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.25',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.23',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'det',
        rel_type_2: 'det_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.24',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.25',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.24',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'amod',
        rel_type_2: 'amod_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.25',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.14',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.25',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'obl',
        rel_type_2: 'obl_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.26',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.14',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.26',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'punct',
        rel_type_2: 'punct_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.27',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.28',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.27',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'nmod:poss',
        rel_type_2: 'nmod:poss_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.28',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.32',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.28',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'nsubj',
        rel_type_2: 'nsubj_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.29',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.32',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.29',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'mark',
        rel_type_2: 'mark_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.30',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.31',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.30',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'det',
        rel_type_2: 'det_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency2.31',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency2',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.32',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.31',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'nsubj',
        rel_type_2: 'nsubj_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.32',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.36',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.32',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'root',
        rel_type_2: 'root_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.33',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.35',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.33',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'case',
        rel_type_2: 'case_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.34',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.35',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.34',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'det',
        rel_type_2: 'det_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency.35',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.32',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.35',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'obl',
        rel_type_2: 'obl_2',
      },
    },
    {
      id: 'forte.data.ontology.stanfordnlp_ontology.Dependency2.36',
      legendId: 'forte.data.ontology.stanfordnlp_ontology.Dependency2',
      fromEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.28',
      toEntryId: 'forte.data.ontology.stanfordnlp_ontology.Token.36',
      attributes: {
        component:
          'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
        'py/object': 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        rel_type: 'punct',
        rel_type_2: 'punct_2',
      },
    },
  ],
  groups: [],
  attributes: {
    cache_state: '',
    doc_id: null,
    language: 'english',
    name: null,
    process_state:
      'forte.processors.StanfordNLP_processor.StandfordNLPProcessor',
    'py/object': 'forte.data.data_pack.Meta',
    span_unit: 'character',
  },
  legends: {
    annotations: [
      {
        id: 'forte.data.ontology.stanfordnlp_ontology.Token',
        name: 'Token',
      },
      {
        id: 'forte.data.ontology.stanfordnlp_ontology.Sentence',
        name: 'Sentence',
      },
      {
        id: 'forte.data.ontology.base_ontology.Document',
        name: 'Document',
      },
    ],
    links: [
      {
        id: 'forte.data.ontology.stanfordnlp_ontology.Dependency',
        name: 'Dependency',
      },
      {
        id: 'forte.data.ontology.stanfordnlp_ontology.Dependency2',
        name: 'Dependency2',
      },
    ],
  },
};
