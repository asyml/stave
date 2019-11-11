import { isJSXIdentifier } from '@babel/types';

export interface IAttributes {
  [key: string]: any;
}

export interface ISpan {
  begin: number;
  end: number;
}

export interface IEntry {
  id: string;
  attributes: IAttributes;
}

export interface IAnnotation extends IEntry {
  legendId: string;
  span: ISpan;
}

export interface ILink extends IEntry {
  fromEntryId: string;
  toEntryId: string;
  legendId: string;
}

export interface IGroup extends IEntry {
  id: string;
  legendId: string;
  memberType: 'link' | 'annotation';
  members: string[];
}

export interface ISinglePack {
  text: string;
  annotations: IAnnotation[];
  links: ILink[];
  groups: IGroup[];
  legends: {
    annotations: ILegend[];
    links: ILegend[];
    groups: ILegend[];
  };
  attributes: IAttributes;
}

export interface ILegend {
  id: string;
  name: string;
}

export interface IColoredLegend extends ILegend {
  color: string;
}

export interface IRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface IAnnotationPosition {
  rects: IRect[];
}

export interface ILinkWithPos {
  link: ILink;
  fromEntryWithPos: IAnnotationWithPos;
  toEntryWithPos: IAnnotationWithPos;
  fromLinkX: number;
  toLinkX: number;
  fromLinkY: number;
  toLinkY: number;
}

export interface IAnnotationWithPos {
  position: IAnnotationPosition;
  annotation: IAnnotation;
}

export interface IOntology {
  ontologyName: string;
  imports: string[];
  entryDefinitions: IEntryDefinition[];
  constraints: IConstraints;
}

export interface IConstraints {
  [entryName: string]: {
    [propertyName: string]: IConstraint;
  }[];
}

export interface IConstraint {
  [propertyName: string]: IConstraint | any[];
}

// const constraints = {
//   ann1: [
//     {
//       attributes: {
//         att1: ['a1', 'b1', 'c1', 'd1'],
//       },
//     },
//   ],
//   ann2: [
//     {
//       attributes: {
//         att2: ['a2', 'b2', 'c2', 'd2'],
//       },
//     },
//   ],
//   lin1: [
//     {
//       attributes: {
//         att3: ['e', 'f'],
//       },
//       parentType: {
//         entryName: ['ann1'],
//         attributes: {
//           att1: ['a1', 'b1'],
//         },
//       },
//       childType: {
//         entryName: ['ann2'],
//         attributes: {
//           att2: ['a2', 'c2'],
//         },
//       },
//     },
//     {
//       attributes: {
//         att3: ['e', 'f'],
//       },
//       parentType: {
//         entryName: ['ann1'],
//         attributes: {
//           att1: ['a1', 'b1'],
//         },
//       },
//       childType: {
//         entryName: ['ann2'],
//         attributes: {
//           att2: ['a2', 'c2'],
//         },
//       },
//     },
//   ],
// };

// const a: IConstraint = constraints;

export interface IEntryDefinition {
  entryName: string;
  parentEntryName: string;
  parentType?: string;
  childType?: string;
  memberType?: string;
  attributes?: IEntryAttributeDefinition[];
}

export interface IEntryAttributeDefinition {
  attributeType: string;
  attributeName: string;
  [key: string]: any;
}

export interface ISpaceMap {
  [key: string]: {
    annotationWithPos: IAnnotationWithPos;
    spaceToMove: number;
  };
}

export interface IPos {
  x: number;
  y: number;
}

export interface ITextNodeDimension {
  width: number;
  height: number;
  x: number;
  y: number;
  clientX: number;
  clientY: number;
}

export interface ISelectOption {
  value: string;
  label: string;
}

export interface IPlugin {
  name: string;
  component: (props: any) => JSX.Element | null;
  enabled: (props: any) => boolean;
}
