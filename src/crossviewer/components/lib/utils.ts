import {IAnnotation} from "../../../nlpviewer";
import {ICrossDocLink, IMultiPack} from "./interfaces";

function find_annotation_by_id(annotations: IAnnotation[], tid: string) {
    for (let i = 0; i < annotations.length; i++) {
        if (annotations[i].id=="tid") {

        }
    }
}


export function transformMultiPack (rawPack: string): IMultiPack  {
    const data = JSON.parse(rawPack);
    const packData = data['py/state'];
    const [doc0, doc1] = packData['_pack_ref'];
    const crossDocs = [doc0, doc1];
    const linkData = packData['links'];
    const crossLinks = linkData.map((a: any)=> {
        return {
            id: a["py/state"]["_tid"],
            _parent_token: a["py/state"]["_parent"]["py/tuple"][1],
            _child_token: a["py/state"]["_child"]["py/tuple"][1]};
    });
    return {
        _parent_doc: doc0,
        _child_doc: doc1,
        crossDocLink : crossLinks
    };
}

export function transformBackMultiPack(link: ICrossDocLink): any {
    return {
        'py/state': {
            _child: { "py/tuple":[1, link._child_token]},
            _parent: { "py/tuple":[0, link._parent_token]}
        },
    };
}