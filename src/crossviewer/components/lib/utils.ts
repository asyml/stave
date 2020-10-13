import {ICreationRecordPerson, ICrossDocLink, IMultiPack, IMultiPackQuestion, IQuestion} from "./interfaces";
import {coref_question_entry_name, suggest_question_entry_name} from "./definitions";


export function transformMultiPackQuestion(rawOntology: string): IMultiPackQuestion {
    const data = JSON.parse(rawOntology);
    // @ts-ignore
    const coref_questions =  data['py/state']["generics"].filter(item => item["py/object"] === coref_question_entry_name).map(raw_question => {
        const question : IQuestion = {
            question_id: raw_question["py/state"]["_tid"],
            question_text: raw_question["py/state"]["question_body"],
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

    //@ts-ignore
    const suggest_questions =  data['py/state']["generics"].filter(item => item["py/object"] === suggest_question_entry_name).map(raw_question => {
        const question : IQuestion = {
            question_id: raw_question["py/state"]["_tid"],
            question_text: raw_question["py/state"]["question_body"],
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

export function transformMultiPack (rawPack: string, forteID: string): IMultiPack  {
    const data = JSON.parse(rawPack);
    const packData = data['py/state'];
    const [doc0, doc1] = packData['_pack_ref'];

    var annotated_tids : number[] = [];
    if (forteID in packData['creation_records']) {
        annotated_tids = packData['creation_records'][forteID]["py/set"];
    }

    const linkData = packData['links'];
    const crossLinks :ICrossDocLink[]= linkData.flatMap((a: any)=> {
        const link = {
            id: a["py/state"]["_tid"],
            _parent_token: a["py/state"]["_parent"]["py/tuple"][1],
            _child_token: a["py/state"]["_child"]["py/tuple"][1],
            coref: a["py/state"]["rel_type"],
        };

        if (a["py/state"]["rel_type"] !== "suggested" && annotated_tids.includes(a["py/state"]["_tid"])) {
            return [link];
        } else {
            return [];
        }
    });

    const suggestedLinks:ICrossDocLink[]= linkData.flatMap((a: any)=> {

        const link = {
            id: a["py/state"]["_tid"],
            _parent_token: a["py/state"]["_parent"]["py/tuple"][1],
            _child_token: a["py/state"]["_child"]["py/tuple"][1],
            coref: a["py/state"]["rel_type"],
        };
        if (a["py/state"]["rel_type"] === "suggested"){
            const parent_token = a["py/state"]["_parent"]["py/tuple"][1];
            const child_token = a["py/state"]["_child"]["py/tuple"][1];
            var found = false;
            for (var i = 0; i < crossLinks.length; i++) {
                if (crossLinks[i]._parent_token === parent_token && crossLinks[i]._child_token === child_token) found=true;
            }
            if (found) {
                return [];
            } else {
                return [link];
            }
        } else {
            return [];
        }
    });

    return {
        _parent_doc: doc0,
        _child_doc: doc1,
        crossDocLink : crossLinks,
        suggestedLink: suggestedLinks,
        creation_records: [],
    };
}



export function transformBackMultiPack(link: ICrossDocLink): any {
    console.log(link);
    if (!link.hasOwnProperty('id') || link.id === undefined) {
        return {
            'py/state': {
                _child: { "py/tuple":[1, link._child_token]},
                _parent: { "py/tuple":[0, link._parent_token]},
                rel_type: link.coref,
                coref_question_answers: link.coref_answers,
                suggested_question_answers: link.suggested_answers,
            },
        }
    } else {
        return {
            'py/state': {
                _child: {"py/tuple": [1, link._child_token]},
                _parent: {"py/tuple": [0, link._parent_token]},
                rel_type: link.coref,
                _tid: link.id,
                coref_question_answers: link.coref_answers,
                suggested_question_answers: link.suggested_answers,
            }
        }
    }
}




export function transformMultiPackAnnoViewer (rawPack: string): IMultiPack  {
    const data = JSON.parse(rawPack);
    const packData = data['py/state'];
    const [doc0, doc1] = packData['_pack_ref'];


    const linkData = packData['links'];
    const crossLinks :ICrossDocLink[]= linkData.flatMap((a: any)=> {
        const link = {
            id: a["py/state"]["_tid"],
            _parent_token: a["py/state"]["_parent"]["py/tuple"][1],
            _child_token: a["py/state"]["_child"]["py/tuple"][1],
            coref: a["py/state"]["rel_type"],
        };

        if (a["py/state"]["rel_type"] !== "suggested") {
            return [link];
        } else {
            return [];
        }
    });
    const creation_records_data = packData["creation_records"];
    const creation_records: ICreationRecordPerson[] = Object.keys(creation_records_data).map((forteID : any) => (
      {
          forteID: forteID,
          records: creation_records_data[forteID]["py/set"]
      }));
    const suggestedLinks :ICrossDocLink[] = [];
    return {
        _parent_doc: doc0,
        _child_doc: doc1,
        crossDocLink : crossLinks,
        suggestedLink: suggestedLinks,
        creation_records: creation_records,
    };
}