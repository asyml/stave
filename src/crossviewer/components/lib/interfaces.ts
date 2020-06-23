export interface ICrossDocLink {
    // link id is always a number
    id: number|undefined;
    _parent_token: number;
    _child_token: number;
    coref: string;
    coref_answers: ICrossDocLinkAnswer[];
    suggested_answers: ICrossDocLinkAnswer[];
}
export interface ICrossDocLinkAnswer {
    question_id: number;
    option_id: number;
}

export interface IMultiPack {
    _parent_doc: number;
    _child_doc: number;
    crossDocLink : ICrossDocLink[];
}

export interface IMultiPackQuestion {
    coref_questions: IQuestion[];
    suggest_questions: IQuestion[];
}

export interface IQuestion {
    question_id: number;
    question_text:string;
    options: IOption[];
}
export interface IOption{
    option_id: number;
    option_text: string;
}
export interface IRange {
    start: number;
    end: number;
    color?: string;
}

export interface IAllRangesForOneType {
    evidenceTypeID: number;
    evidenceTypeName: string;
    parent_ranges: IRange[];
    child_ranges: IRange[];
}