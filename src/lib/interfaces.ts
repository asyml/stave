export interface IMetadata {
  [key: string]: any;
}

export interface ISpan {
  begin: number;
  end: number;
}

export interface IEntry {
  id: string;
  attributes: {
    [key: string]: any;
  };
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
  metadata: IMetadata;
}

export interface ILegend {
  id: string;
  name: string;
  color: string;
}
