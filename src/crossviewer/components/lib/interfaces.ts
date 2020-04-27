export interface ICrossDocLink {
    id: string;
    _parent_token: number;
    _child_token: number;
}

export interface IMultiPack {
    _parent_doc: number;
    _child_doc: number;
    crossDocLink : ICrossDocLink[];
}