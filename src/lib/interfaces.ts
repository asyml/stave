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
}

export interface IGroup extends IEntry {
  annotations: IAnnotation[];
}

export interface ISinglePack {
  text: string;
  annotations: IAnnotation[];
  links: ILink[];
  groups: IGroup[];
  legends: ILegend[];
  attributes: IAttributes;
}

export interface ILegend {
  id: string;
  name: string;
}

export interface IColoredLegend extends ILegend {
  color: string;
}

export interface AnnotationPosition {
  rects: {
    x: number;
    y: number;
    width: number;
    height: number;
  }[];
}

export interface LinkWithPos {
  link: ILink;
  fromEntryWithPos: {
    position: AnnotationPosition;
    annotation: IAnnotation;
  };
  toEntryWithPos: {
    position: AnnotationPosition;
    annotation: IAnnotation;
  };
  fromLinkX: number;
  toLinkX: number;
  fromLinkY: number;
  toLinkY: number;
}
