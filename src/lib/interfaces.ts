export interface ISpan {
  begin: number;
  end: number;
}

export interface IAnnotationType {
  name: string;
  color: string;
}

export interface IEntry {
  id: string;
  attributes: {
    [key: string]: any;
  };
}

export interface IAnnotation extends IEntry {
  type: IAnnotationType;
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
}
