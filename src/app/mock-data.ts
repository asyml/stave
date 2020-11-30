import {ISinglePack} from '../nlpviewer';

export const singlePack: ISinglePack = {
  text:
    "The Indonesian billionaire James Riady has agreed to pay $ 8.5 million and plead guilty to illegally donating money for Bill Clinton 's 1992 presidential campaign . He admits he was trying to influence American policy on China .",
  annotations: [
    {
      span: {begin: 0, end: 3},
      id: 'OntonotesOntology.Token.0',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'DT',
        sense: '-',
      },
    },
    {
      span: {begin: 4, end: 14},
      id: 'OntonotesOntology.Token.1',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'JJ',
        sense: '-',
      },
    },
    {
      span: {begin: 4, end: 14},
      id: 'BaseOntology.EntityMention.0',
      legendId: 'l2',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        ner_type: 'NORP',
      },
    },
    {
      span: {begin: 15, end: 26},
      id: 'OntonotesOntology.Token.2',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'NN',
        sense: '-',
      },
    },
    {
      span: {begin: 27, end: 32},
      id: 'OntonotesOntology.Token.3',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'NNP',
        sense: '-',
      },
    },
    {
      span: {begin: 33, end: 38},
      id: 'OntonotesOntology.Token.4',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'NNP',
        sense: '-',
      },
    },
    {
      span: {begin: 27, end: 38},
      id: 'BaseOntology.EntityMention.1',
      legendId: 'l2',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        ner_type: 'PERSON',
      },
    },
    {
      span: {begin: 0, end: 38},
      id: 'BaseOntology.PredicateArgument.0',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 0, end: 38},
      id: 'BaseOntology.CoreferenceMention.0',
      legendId: 'l6',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 39, end: 42},
      id: 'OntonotesOntology.Token.5',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'VBZ',
        sense: '-',
      },
    },
    {
      span: {begin: 39, end: 42},
      id: 'OntonotesOntology.PredicateMention.0',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '01',
        links: [],
        pred_lemma: 'have',
        pred_type: 'verb',
      },
    },
    {
      span: {begin: 43, end: 49},
      id: 'OntonotesOntology.Token.6',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'VBN',
        sense: '3',
      },
    },
    {
      span: {begin: 43, end: 49},
      id: 'OntonotesOntology.PredicateMention.1',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '01',
        links: ['BaseOntology.PredicateLink.0', 'BaseOntology.PredicateLink.1'],
        pred_lemma: 'agree',
        pred_type: 'verb',
      },
    },
    {
      span: {begin: 50, end: 52},
      id: 'OntonotesOntology.Token.7',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'TO',
        sense: '-',
      },
    },
    {
      span: {begin: 53, end: 56},
      id: 'OntonotesOntology.Token.8',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'VB',
        sense: '1',
      },
    },
    {
      span: {begin: 53, end: 56},
      id: 'OntonotesOntology.PredicateMention.2',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '01',
        links: ['BaseOntology.PredicateLink.2', 'BaseOntology.PredicateLink.3'],
        pred_lemma: 'pay',
        pred_type: 'verb',
      },
    },
    {
      span: {begin: 57, end: 58},
      id: 'OntonotesOntology.Token.9',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: '$',
        sense: '-',
      },
    },
    {
      span: {begin: 59, end: 62},
      id: 'OntonotesOntology.Token.10',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'CD',
        sense: '-',
      },
    },
    {
      span: {begin: 63, end: 70},
      id: 'OntonotesOntology.Token.11',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'CD',
        sense: '-',
      },
    },
    {
      span: {begin: 57, end: 70},
      id: 'BaseOntology.EntityMention.2',
      legendId: 'l2',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        ner_type: 'MONEY',
      },
    },
    {
      span: {begin: 57, end: 70},
      id: 'BaseOntology.PredicateArgument.1',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 71, end: 74},
      id: 'OntonotesOntology.Token.12',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'CC',
        sense: '-',
      },
    },
    {
      span: {begin: 75, end: 80},
      id: 'OntonotesOntology.Token.13',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'VB',
        sense: '3',
      },
    },
    {
      span: {begin: 75, end: 80},
      id: 'OntonotesOntology.PredicateMention.3',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '02',
        links: [
          'BaseOntology.PredicateLink.4',
          'BaseOntology.PredicateLink.5',
          'BaseOntology.PredicateLink.6',
        ],
        pred_lemma: 'plead',
        pred_type: 'verb',
      },
    },
    {
      span: {begin: 81, end: 87},
      id: 'OntonotesOntology.Token.14',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'JJ',
        sense: '-',
      },
    },
    {
      span: {begin: 81, end: 87},
      id: 'BaseOntology.PredicateArgument.2',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 88, end: 90},
      id: 'OntonotesOntology.Token.15',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'IN',
        sense: '-',
      },
    },
    {
      span: {begin: 91, end: 100},
      id: 'OntonotesOntology.Token.16',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'RB',
        sense: '-',
      },
    },
    {
      span: {begin: 91, end: 100},
      id: 'BaseOntology.PredicateArgument.3',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 101, end: 109},
      id: 'OntonotesOntology.Token.17',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'VBG',
        sense: '1',
      },
    },
    {
      span: {begin: 101, end: 109},
      id: 'OntonotesOntology.PredicateMention.4',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '01',
        links: [
          'BaseOntology.PredicateLink.7',
          'BaseOntology.PredicateLink.8',
          'BaseOntology.PredicateLink.9',
        ],
        pred_lemma: 'donate',
        pred_type: 'verb',
      },
    },
    {
      span: {begin: 110, end: 115},
      id: 'OntonotesOntology.Token.18',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'NN',
        sense: '2',
      },
    },
    {
      span: {begin: 110, end: 115},
      id: 'OntonotesOntology.PredicateMention.5',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '-',
        links: [],
        pred_lemma: 'money',
        pred_type: 'other',
      },
    },
    {
      span: {begin: 110, end: 115},
      id: 'BaseOntology.PredicateArgument.4',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 116, end: 119},
      id: 'OntonotesOntology.Token.19',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'IN',
        sense: '-',
      },
    },
    {
      span: {begin: 120, end: 124},
      id: 'OntonotesOntology.Token.20',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'NNP',
        sense: '-',
      },
    },
    {
      span: {begin: 125, end: 132},
      id: 'OntonotesOntology.Token.21',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'NNP',
        sense: '-',
      },
    },
    {
      span: {begin: 133, end: 135},
      id: 'OntonotesOntology.Token.22',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'POS',
        sense: '-',
      },
    },
    {
      span: {begin: 120, end: 135},
      id: 'BaseOntology.EntityMention.3',
      legendId: 'l2',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        ner_type: 'PERSON',
      },
    },
    {
      span: {begin: 136, end: 140},
      id: 'OntonotesOntology.Token.23',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'CD',
        sense: '-',
      },
    },
    {
      span: {begin: 136, end: 140},
      id: 'BaseOntology.EntityMention.4',
      legendId: 'l2',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        ner_type: 'DATE',
      },
    },
    {
      span: {begin: 141, end: 153},
      id: 'OntonotesOntology.Token.24',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'JJ',
        sense: '-',
      },
    },
    {
      span: {begin: 154, end: 162},
      id: 'OntonotesOntology.Token.25',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'NN',
        sense: '1',
      },
    },
    {
      span: {begin: 154, end: 162},
      id: 'OntonotesOntology.PredicateMention.6',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '-',
        links: [],
        pred_lemma: 'campaign',
        pred_type: 'other',
      },
    },
    {
      span: {begin: 50, end: 162},
      id: 'BaseOntology.PredicateArgument.5',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 88, end: 162},
      id: 'BaseOntology.PredicateArgument.6',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 116, end: 162},
      id: 'BaseOntology.PredicateArgument.7',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 163, end: 164},
      id: 'OntonotesOntology.Token.26',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: '.',
        sense: '-',
      },
    },
    {
      span: {begin: 0, end: 164},
      id: 'OntonotesOntology.Sentence.0',
      legendId: 'l3',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        part_id: 0,
        speaker: '-',
      },
    },
    {
      span: {begin: 165, end: 167},
      id: 'OntonotesOntology.Token.27',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'PRP',
        sense: '-',
      },
    },
    {
      span: {begin: 165, end: 167},
      id: 'BaseOntology.PredicateArgument.8',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 165, end: 167},
      id: 'BaseOntology.CoreferenceMention.1',
      legendId: 'l6',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 168, end: 174},
      id: 'OntonotesOntology.Token.28',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'VBZ',
        sense: '1',
      },
    },
    {
      span: {begin: 168, end: 174},
      id: 'OntonotesOntology.PredicateMention.7',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '01',
        links: [
          'BaseOntology.PredicateLink.10',
          'BaseOntology.PredicateLink.11',
        ],
        pred_lemma: 'admit',
        pred_type: 'verb',
      },
    },
    {
      span: {begin: 175, end: 177},
      id: 'OntonotesOntology.Token.29',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'PRP',
        sense: '-',
      },
    },
    {
      span: {begin: 175, end: 177},
      id: 'BaseOntology.PredicateArgument.9',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 175, end: 177},
      id: 'BaseOntology.CoreferenceMention.2',
      legendId: 'l6',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 178, end: 181},
      id: 'OntonotesOntology.Token.30',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'VBD',
        sense: '-',
      },
    },
    {
      span: {begin: 178, end: 181},
      id: 'OntonotesOntology.PredicateMention.8',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '03',
        links: [],
        pred_lemma: 'be',
        pred_type: 'verb',
      },
    },
    {
      span: {begin: 182, end: 188},
      id: 'OntonotesOntology.Token.31',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'VBG',
        sense: '1',
      },
    },
    {
      span: {begin: 182, end: 188},
      id: 'OntonotesOntology.PredicateMention.9',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '01',
        links: [
          'BaseOntology.PredicateLink.12',
          'BaseOntology.PredicateLink.13',
        ],
        pred_lemma: 'try',
        pred_type: 'verb',
      },
    },
    {
      span: {begin: 189, end: 191},
      id: 'OntonotesOntology.Token.32',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'TO',
        sense: '-',
      },
    },
    {
      span: {begin: 192, end: 201},
      id: 'OntonotesOntology.Token.33',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'VB',
        sense: '1',
      },
    },
    {
      span: {begin: 192, end: 201},
      id: 'OntonotesOntology.PredicateMention.10',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '01',
        links: [
          'BaseOntology.PredicateLink.14',
          'BaseOntology.PredicateLink.15',
        ],
        pred_lemma: 'influence',
        pred_type: 'verb',
      },
    },
    {
      span: {begin: 202, end: 210},
      id: 'OntonotesOntology.Token.34',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'JJ',
        sense: '-',
      },
    },
    {
      span: {begin: 202, end: 210},
      id: 'BaseOntology.EntityMention.5',
      legendId: 'l2',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        ner_type: 'NORP',
      },
    },
    {
      span: {begin: 211, end: 217},
      id: 'OntonotesOntology.Token.35',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'NN',
        sense: '1',
      },
    },
    {
      span: {begin: 211, end: 217},
      id: 'OntonotesOntology.PredicateMention.11',
      legendId: 'l4',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        framenet_id: '-',
        links: [],
        pred_lemma: 'policy',
        pred_type: 'other',
      },
    },
    {
      span: {begin: 218, end: 220},
      id: 'OntonotesOntology.Token.36',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'IN',
        sense: '-',
      },
    },
    {
      span: {begin: 221, end: 226},
      id: 'OntonotesOntology.Token.37',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: 'NNP',
        sense: '-',
      },
    },
    {
      span: {begin: 221, end: 226},
      id: 'BaseOntology.EntityMention.6',
      legendId: 'l2',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        ner_type: 'GPE',
      },
    },
    {
      span: {begin: 175, end: 226},
      id: 'BaseOntology.PredicateArgument.10',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 189, end: 226},
      id: 'BaseOntology.PredicateArgument.11',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 202, end: 226},
      id: 'BaseOntology.PredicateArgument.12',
      legendId: 'l5',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
      },
    },
    {
      span: {begin: 227, end: 228},
      id: 'OntonotesOntology.Token.38',
      legendId: 'l1',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        pos_tag: '.',
        sense: '-',
      },
    },
    {
      span: {begin: 165, end: 228},
      id: 'OntonotesOntology.Sentence.1',
      legendId: 'l3',
      attributes: {
        component: 'nlp.pipeline.io.readers.base_reader.OntonotesReader',
        part_id: 0,
        speaker: '-',
      },
    },
  ],
  links: [],
  groups: [],
  attributes: {docid: 'bn/abc/00/abc_0059'},
  // legends: {
  //   annotations: [
  //     { id: 'l1', name: 'Token' },
  //     { id: 'l2', name: 'EntityMention' },
  //     { id: 'l3', name: 'Sentence' },
  //     { id: 'l4', name: 'PredicateMention' },
  //     { id: 'l5', name: 'PredicateArgument' },
  //     { id: 'l6', name: 'CoreferenceMention' },
  //   ],
  //   links: [],
  //   groups: [],
  // },
};
