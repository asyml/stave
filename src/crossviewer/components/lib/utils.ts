import {IAnnotation} from "../../../nlpviewer";
import {ICrossDocLink, IMultiPack, IMultiPackOntology, IQuestion} from "./interfaces";
import {coref_question_entry_name, suggest_question_entry_name} from "./definitions";

function find_annotation_by_id(annotations: IAnnotation[], tid: string) {
    for (let i = 0; i < annotations.length; i++) {
        if (annotations[i].id=="tid") {

        }
    }
}

export function transformMultiPackOntology(rawOntology: string): IMultiPackOntology {
    const data = JSON.parse(rawOntology);
    // @ts-ignore
    const coref_questions =  data['entryDefinitions'].find(item => item["entry_name"] === coref_question_entry_name)["attributes"].map(raw_question => {
            const question : IQuestion = {
                question_id: raw_question["question_id"],
                question_text: raw_question["question_text"],
                // @ts-ignore
                options : raw_question["options"].map(raw_option =>
                  ({
                      option_id: raw_option["option_id"],
                      option_text: raw_option['option_text']
                  })
                )
            };
            return question
        });
    //@ts-ignore
    const suggest_questions =  data['entryDefinitions'].find(item => item["entry_name"] === suggest_question_entry_name)["attributes"].map(raw_question => {
        const question : IQuestion = {
            question_id: raw_question["question_id"],
            question_text: raw_question["question_text"],
            // @ts-ignore
            options : raw_question["options"].map(raw_option =>
              ({
                  option_id: raw_option["option_id"],
                  option_text: raw_option['option_text']
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
                rel_type: link.coref? "coreference" : "non-coreference",
                evidence_questions: link.answers,
            },
        }
    } else {
        return {
            'py/state': {
                _child: {"py/tuple": [1, link._child_token]},
                _parent: {"py/tuple": [0, link._parent_token]},
                rel_type: link.coref? "coreference" : "non-coreference",
                _tid: link.id,
                evidence_questions: link.answers,
            }
        }
    }
}