"""
Provide interfaces to parse DataPack and ontology for interaction and
conversion of different data formats between frontend side and backend side.
"""

import json
from typing import Dict, Optional
from packaging.version import Version
import tempfile

from forte.data import DataPack, DataStore
from forte.data.ontology import Annotation, Link
from forte.common import constants
from forte.version import PACK_ID_COMPATIBLE_VERSION


class StavePackParser:
    r"""
    StavePackParser provides interfaces to parse DataPack and ontology
    specifications for backend APIs to interact with frontend data formats.
    Example usage:

            StavePackParser(raw_pack, raw_ontology).transform_pack()

    """
    
    ANNOTATION_LIST = "annotations"
    LINK_LIST = "links"

    def __init__(self, raw_pack: str, raw_ontology: str) -> None:
        """
        Initialize StavePackParser with input paramaters.

        Args:
            raw_pack: String of serializaed DataPack. The format should be
                compatible with lastest DataPack schema. However, we will still
                support some old formats (through some manual parsing) so that
                the example projects do not break.
            raw_ontology: String of serialized ontology json specification.
        """
        # Parse all entries from ontology
        with tempfile.NamedTemporaryFile(suffix=".json") as onto_file:
            with open(onto_file.name, 'w') as f:
                f.write(raw_ontology)

            # Clear the previous type info to avoid conflicts in onto
            # definitions
            DataStore._type_attributes = {}

            # Populate DataStore._type_attributes with entries defined
            # in input ontology spec
            self._data_store: DataStore = DataStore(
                onto_file_path=onto_file.name
            )

        self._definitions: Dict = {
            definition["entry_name"]: definition
            for definition in json.loads(raw_ontology).get("definitions", [])
        }
        self._pack_json: Dict = json.loads(raw_pack)

        # When the input serialized DataPack's format is outdated, we
        # set self._pack to None.
        self._pack: Optional[DataPack] = None
        if Version(
            self._pack_json["py/state"].get("pack_version", "0.0.0")
        ) >= Version(
            PACK_ID_COMPATIBLE_VERSION
        ):
            # Parse the raw DataPack when its version is compatible
            self._pack = DataPack.from_string(raw_pack)
            self._data_store = self._pack._data_store

    def transform_pack(self) -> Dict:
        """
        Convert DataPack to a json format that can be understood by
        frontend utilities.

        Returns:
            A dictionary conformed to a schema for frontend rendering.
        """
        if self._pack is None:
            # Transform DataPack based on legacy format
            return self._transform_pack_json()
        return self._transform_pack()

    def add_entry_to_doc(self, entry_dict: Dict) -> str:
        """
        Add an entry to DataPack.

        Args:
            entry_dict: A dictionary containing the information of the new
                entry to be added. For example:

                    {
                        'py/object': annotation.entry_type(),
                        'py/state': {
                        _span: {
                            begin: annotation.span.begin,
                            end: annotation.span.end,
                            'py/object': 'forte.data.span.Span',
                        },
                        _tid: annotation.tid,
                        ...annotation.attributes,
                        },
                    }

        Returns:
            A string of serialized DataPack with the new entry added.
        """
        if self._pack is None:
            # Add entry to DataPack with legacy format
            if self._data_store._is_subclass(
                type_name=entry_dict["py/object"], cls=Annotation
            ):
                self._pack_json['py/state']["annotations"].append(entry_dict)
            elif self._data_store._is_subclass(
                type_name=entry_dict["py/object"], cls=Link
            ):
                self._pack_json['py/state']["links"].append(entry_dict)
            return json.dumps(self._pack_json)
        else:
            # Add entry to DataPack with compatible format
            self._add_entry_dict_to_pack(entry_dict=entry_dict)
            return self._pack.to_string()

    def edit_entry_in_doc(self, entry_dict: Dict) -> str:
        """
        Edit an existing entry in DataPack.

        Args:
            entry_dict: A dictionary containing the information of the entry
                to be updated.

        Returns:
            A string of serialized DataPack with the updated entry.
        """
        if self._pack is None:
            # Edit entry in DataPack with legacy format
            list_name: str = ''
            if self._data_store._is_subclass(
                type_name=entry_dict["py/object"], cls=Annotation
            ):
                list_name = "annotations"
            elif self._data_store._is_subclass(
                type_name=entry_dict["py/object"], cls=Link
            ):
                list_name = "links"
            if list_name:
                for index, item in enumerate(self._pack_json['py/state'][list_name]):
                    if str(item["py/state"]['_tid']) == str(entry_dict["py/state"]['_tid']):
                        self._pack_json['py/state'][list_name][index] = entry_dict
            return json.dumps(self._pack_json)
        else:
            # Edit entry in DataPack with compatible format
            self._pack.delete_entry(
                entry=self._pack.get_entry(tid=int(entry_dict["py/state"]['_tid']))
            )
            self._add_entry_dict_to_pack(entry_dict=entry_dict)
            return self._pack.to_string()

    def delete_annotation_from_doc(self, entry_tid: str) -> str:
        """
        Delete an Annotation entry from DataPack.

        Args:
            entry_tid: A string representing the TID of the annotation to be
                deleted.

        Returns:
            A string of serialized DataPack with the target annotation deleted.
        """
        return self._delete_entry_from_doc(
            entry_tid=entry_tid, type_list=self.ANNOTATION_LIST
        )

    def delete_link_from_doc(self, entry_tid: str) -> str:
        """
        Delete a Link entry from DataPack.

        Args:
            entry_tid: A string representing the TID of the link to be
                deleted.

        Returns:
            A string of serialized DataPack with the target link deleted.
        """
        return self._delete_entry_from_doc(
            entry_tid=entry_tid, type_list=self.LINK_LIST
        )

    def _transform_pack(self):
        """
        Transform a DataPack object to a json for frontend rendering
        """
        annotations, links, groups = [], [], []
        for annotation in self._data_store.all_entries(
            entry_type_name="forte.data.ontology.top.Annotation"
        ):
            annotations.append({
                "span": {
                    "begin": annotation[constants.BEGIN_INDEX],
                    "end": annotation[constants.END_INDEX],
                    },
                "id": str(annotation[constants.TID_INDEX]),
                "legendId": annotation[constants.ENTRY_TYPE_INDEX],
                "attributes": {
                    attr_name: annotation[attr_index] for (
                        attr_name, attr_index
                    ) in self._data_store._get_type_attribute_dict(
                        type_name=annotation[constants.ENTRY_TYPE_INDEX]
                    ).items()
                }
            })

        for link in self._data_store.all_entries(
            "forte.data.ontology.top.Link"
        ):
            links.append({
                "id": str(link[constants.TID_INDEX]),
                "fromEntryId": str(link[constants.PARENT_TID_INDEX]),
                "toEntryId": str(link[constants.CHILD_TID_INDEX]),
                "legendId": link[constants.ENTRY_TYPE_INDEX],
                "attributes": {
                    attr_name: link[attr_index] for (
                        attr_name, attr_index
                    ) in self._data_store._get_type_attribute_dict(
                        type_name=link[constants.ENTRY_TYPE_INDEX]
                    ).items()
                }
            })

        for group in self._data_store.all_entries(
            "forte.data.ontology.top.Group"
        ):
            groups.append({
                "id": str(group[constants.TID_INDEX]),
                "members": [str(member) for member in group[constants.MEMBER_TID_INDEX]],
                "memberType": group[constants.MEMBER_TYPE_INDEX],
                "legendId": group[constants.ENTRY_TYPE_INDEX],
                "attributes": {
                    attr_name: group[attr_index] for (
                        attr_name, attr_index
                    ) in self._data_store._get_type_attribute_dict(
                        type_name=group[constants.ENTRY_TYPE_INDEX]
                    ).items()
                }
            })

        return {
            "text": self._pack.text,
            "annotations": annotations,
            "links": links,
            "groups": groups,
            "attributes": self._pack._meta.__dict__.copy()
        }

    def _transform_pack_json(self):
        """
        Transform a DataPack dictionary with legacy format to a json for
        frontend rendering
        """
        pack_state: Dict = self._pack_json["py/state"]

        annotations, links, groups = [], [], []
        for annotation in pack_state["annotations"]:
            entry_data: Dict = annotation.get("py/state")
            if not entry_data: continue
            annotations.append({
                "span": {
                    "begin": entry_data["_span"]["begin"],
                    "end": entry_data["_span"]["end"],
                    },
                "id": str(entry_data["_tid"]),
                "legendId": annotation.get("py/object"),
                "attributes": self._get_attributes(annotation),
            })
        for link in pack_state["links"]:
            entry_data: Dict = link.get("py/state")
            if not entry_data: continue
            links.append({
                "id": str(entry_data["_tid"]),
                "fromEntryId": str(entry_data["_parent"]),
                "toEntryId": str(entry_data["_child"]),
                "legendId": link.get("py/object"),
                "attributes": self._get_attributes(link),
            })
        for group in pack_state["groups"]:
            entry_data: Dict = group.get("py/state")
            if not entry_data: continue
            groups.append({
                "id": str(entry_data["_tid"]),
                "members": [str(tid) for tid in entry_data["_members"]["py/set"]],
                "memberType": self._get_group_type(group),
                "legendId": group.get("py/object"),
                "attributes": self._get_attributes(group),
            })

        return {
            "text": pack_state["_text"],
            "annotations": annotations,
            "links": links,
            "groups": groups,
            "attributes":
            # Backward compatibility with Forte formats.
            pack_state["meta"]["py/state"] if "meta" in pack_state else pack_state["_meta"]["py/state"],
        }

    def _get_attributes(self, entry_dict: Dict):
        """
        Get a mapping from attribute names to corresponding values in the input
        entry
        """
        return {
            attribute: entry_dict["py/state"][attribute]
            for attribute in self._data_store._get_type_attribute_dict(
                type_name=entry_dict["py/object"]
            ) if attribute in entry_dict["py/state"]
        }

    def _get_group_type(self, group_dict: Dict):
        """
        Get the member type of a group entry
        """
        member_type: str = self._definitions.get(
            group_dict.get("py/object"), {}
        ).get("member_type")
        if self._data_store._is_subclass(
            type_name=member_type, cls=Annotation
        ):
            return "annotation"
        elif self._data_store._is_subclass(
            type_name=member_type, cls=Link
        ):
            return "link"
        else:
            raise ValueError(
                f"Unknown group entry: {group_dict.get('py/object')}"
            )

    def _add_entry_dict_to_pack(self, entry_dict: Dict):
        """
        Add entry to DataPack with compatible format
        """
        if self._data_store._is_subclass(
            type_name=entry_dict["py/object"], cls=Annotation
        ):
            self._data_store.add_entry_raw(
                type_name=entry_dict["py/object"],
                attribute_data=[
                    int(entry_dict["py/state"]["_span"]["begin"]),
                    int(entry_dict["py/state"]["_span"]["end"])
                ],
                base_class=Annotation,
                tid=int(entry_dict["py/state"]["_tid"])
            )
        elif self._data_store._is_subclass(
            type_name=entry_dict["py/object"], cls=Link
        ):
            self._data_store.add_entry_raw(
                type_name=entry_dict["py/object"],
                attribute_data=[
                    int(entry_dict["py/state"]["_parent"]), 
                    int(entry_dict["py/state"]["_child"])
                ],
                base_class=Link,
                tid=int(entry_dict["py/state"]["_tid"])
            )

    def _delete_entry_from_doc(self, entry_tid: str, type_list: str):
        """
        Delete an entry from DataPack.
        """
        if self._pack is None:
            for index, item in enumerate(self._pack_json['py/state'][type_list]):
                if str(item["py/state"]['_tid']) == str(entry_tid):
                    delete_index = index
            if delete_index >= 0:
                del self._pack_json['py/state'][type_list][delete_index]
            return json.dumps(self._pack_json)
        else:
            self._pack.delete_entry(entry=self._pack.get_entry(tid=int(entry_tid)))
            return self._pack.to_string()
