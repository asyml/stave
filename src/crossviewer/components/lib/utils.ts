import {IAnnotation} from "../../../nlpviewer";
import {ICrossDocLink, IMultiPack, IMultiPackQuestion, IQuestion} from "./interfaces";
import {coref_question_entry_name, suggest_question_entry_name} from "./definitions";


export function transformMultiPackQuestion(rawOntology: string): IMultiPackQuestion {
    const data = JSON.parse(rawOntology);
    // @ts-ignore
    const coref_questions =  data['py/state']["generics"].filter(item => item["py/object"] === coref_question_entry_name).map(raw_question => {
        const question : IQuestion = {
            question_id: raw_question["_tid"],
            question_text: raw_question["py/state"]["text"],
            // @ts-ignore
            options : raw_question["py/state"]["options"].map((raw_option, index) =>
              ({
                  option_id: index,
                  option_text: raw_option
              })
            )
        };
        return question
        });

    console.log(data['py/state']["generics"]);
    //@ts-ignore
    const suggest_questions =  data['py/state']["generics"].filter(item => item["py/object"] === suggest_question_entry_name).map(raw_question => {
        const question : IQuestion = {
            question_id: raw_question["_tid"],
            question_text: raw_question["py/state"]["text"],
            // @ts-ignore
            options : raw_question["py/state"]["options"].map((raw_option, index) =>
              ({
                  option_id: index,
                  option_text: raw_option
              })
            )
        };
        return question
    });

    return {coref_questions : coref_questions,
            suggest_questions: suggest_questions,}
}

export function transformMultiPack (rawPack: string): IMultiPack  {
    const data = JSON.parse(rawPack);
    const packData = data['py/state'];
    const [doc0, doc1] = packData['_pack_ref'];
    const crossDocs = [doc0, doc1];
    const linkData = packData['links'];
    const crossLinks :ICrossDocLink[]= linkData.map((a: any)=> {
        return {
            id: a["py/state"]["_tid"],
            _parent_token: a["py/state"]["_parent"]["py/tuple"][1],
            _child_token: a["py/state"]["_child"]["py/tuple"][1],
            coref: a["py/state"]["rel_type"] === "coreference",
        };
    });
    return {
        _parent_doc: doc0,
        _child_doc: doc1,
        crossDocLink : crossLinks
    };
}

export function transformBackMultiPack(link: ICrossDocLink): any {
    console.log(link);
    if (!link.hasOwnProperty('id') || link.id == undefined) {
        return {
            'py/state': {
                _child: { "py/tuple":[1, link._child_token]},
                _parent: { "py/tuple":[0, link._parent_token]},
                rel_type: link.coref? "coref" : "not-coref",
                evidence_question_answers: link.answers,
            },
        }
    } else {
        return {
            'py/state': {
                _child: {"py/tuple": [1, link._child_token]},
                _parent: {"py/tuple": [0, link._parent_token]},
                rel_type: link.coref? "coref" : "not-coreference",
                _tid: link.id,
                evidence_question_answers: link.answers,
            }
        }
    }
}