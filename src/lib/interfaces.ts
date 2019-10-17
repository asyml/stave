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
  annotationIds: string[];
  linkIds: string[];
}

export interface ISinglePack {
  text: string;
  annotations: IAnnotation[];
  links: ILink[];
  groups: IGroup[];
  legends: {
    annotations: ILegend[];
    links: ILegend[];
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
  entryDefinitions: IEntryDefinition[];
}

export interface IEntryDefinition {
  entryName: string;
  parentEntryName: string;
  parentType?: string;
  childType?: string;
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

export interface ISpacedAnnotationSpan {
  [annotationId: string]: { begin: number; end: number };
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
