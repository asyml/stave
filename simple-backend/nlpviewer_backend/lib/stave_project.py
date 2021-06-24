"""
This module provides a set of interfaces to simplify the process of
serializing/deserializing project between Stave database and local disk.

StaveProjectWriter:
    Serialize a Stave project to local disk storage.
StaveProjectReader:
    Parse a directory to get project information.
"""

import os
import glob
import json
import errno
import logging
from typing import Union, Dict, Set, Any, List, Optional

logger = logging.getLogger(__name__)

__all__ = [
    "StaveProjectReader"
    "StaveProjectWriter"
]


class StaveProject:
    """
    Base class that defines the format of serialized project metadata.
    It specifies the name (PROJECT_META_FILE) of file that stores the
    metadata and the structure (****_FIELD) of json object.
    It is extensible to support new structure/fields, which can be
    registered in this class.
    """

    PROJECT_META_FILE = ".project_meta.json"
    NAME_FIELD = "project_name"
    TYPE_FIELD = "project_type"
    ONTO_FIELD = "ontology"
    CONF_FIELD = "project_configs"
    MULT_FIELD = "multi_ontology"

    def __init__(self, project_path: str):
        """
        Initialize base StaveProject.

        Args:
            project_path: Path to the project directory.
        """
        self._project_path: str = os.path.abspath(project_path)


class StaveProjectReader(StaveProject):
    """
    Parse a pregenerated directory to get project information.
    The project directory must exist and follow the standard
    format specified below:

        - project_path/
            - PROJECT_META_FILE
            - *.0.json
            - *.1.json
            - *.2.json
            ...
    
    StaveProjectReader will extract project information from project
    directory. Example usage:

        project_reader = StaveProjectReader(project_path=project_path)
        ontology = project_reader.ontology
        project_configs = project_reader.project_configs
        textpack_0 = project_reader.get_textpack(0)

    """

    def __init__(self, project_path: str):
        """
        Initialize StaveProjectReader and check the directory.
        Verification on the project path is performed here, so make sure
        to have the project direcotry correctly set and follow the standard
        format.
        
        Args:
            project_path: Path to the project directory.
        """
        super().__init__(project_path)

        # Verify project path
        if not os.path.isdir(self._project_path):
            raise FileNotFoundError(
                errno.ENOENT, os.strerror(errno.ENOENT), self._project_path)

        # Load project meta data
        with open(os.path.join(
            self._project_path, self.PROJECT_META_FILE), "r") as f:
            self._project_meta: Dict = json.load(f)

    @property
    def ontology(self) -> Dict:
        return self._project_meta.get(self.ONTO_FIELD)

    @property
    def project_configs(self) -> Optional[Dict]:
        return self._project_meta.get(self.CONF_FIELD)

    @property
    def project_name(self) -> str:
        return self._project_meta.get(self.NAME_FIELD)

    @property
    def project_type(self) -> str:
        return self._project_meta.get(self.TYPE_FIELD)

    @property
    def multi_ontology(self) -> Dict:
        return self._project_meta.get(self.MULT_FIELD)

    def get_textpack(self, index: int) -> Dict:
        """
        Get the target textpack based on input index. Will raise an exception
        if the index is invalid or not found.

        Args:
            index: The index of target textpack.

        Returns:
            textpack: A dictionary representing a textpack.
        """
        with open(self.get_textpack_file(index), "r") as f:
            textpack = json.load(f)
        return textpack

    def get_textpack_prefix(self, index: int) -> str:
        textpack_file = os.path.basename(self.get_textpack_file(index))
        return textpack_file[:-len(f".{index}.json")]

    def get_textpack_file(self, index: int) -> str:
        # TODO: The following implementation uses glob to find target 
        #       textpack. It is easy for maintenance but can be less
        #       efficient in some use cases. May find better way to track
        #       files or may add a layer of caching in future version.
        file_pattern = os.path.join(self._project_path, f"*.{index}.json")
        match = glob.glob(file_pattern)
        if len(match) != 1:
            if len(match) == 0:
                raise FileNotFoundError(
                    errno.ENOENT, os.strerror(errno.ENOENT), file_pattern)
            raise Exception("Duplicate textpack index.")
        return match[0]

    def get_next_index(self, index: int) -> int:
        match = glob.glob(
            os.path.join(self._project_path, f"*.{index + 1}.json"))
        return index if len(match) == 0 else (index + 1)
    
    def get_prev_index(self, index: int) -> int:
        return max(index - 1, 0)


class StaveProjectWriter(StaveProject):
    """
    Serialize a Stave project onto local disk storage. It will follow the same
    directory specification as StaveProjectReader:

        - project_path/
            - PROJECT_META_FILE
            - *.0.json
            - *.1.json
            - *.2.json
            ...

    Any Stave project can be flushed to disk in the format above.
    Example usage:

        project_writer = StaveProjectWriter(
            project_path=project_path,
            project_name=project_name,
            project_type=project_type,
            ontology=ontology,
            project_configs=project_configs
        )
        for textpack in textpack_list:
            project_writer.write_textpack(textpack.name, textpack.content)

    """

    def __init__(self,
        project_path: str,
        project_name: str,
        project_type: str,
        ontology: Dict,
        project_configs: Optional[Dict] = None,
        multi_ontology: Dict = {},
        allow_overwrite: bool = True
    ):
        """
        Initialize StaveProjectWriter and create the project meta file.
        If `project_path` does not exist, it will create a new directory.
        
        Args:
            project_path: Path to the project directory.
            project_name: Project name displayed on Stave.
            project_type: single_pack / multi_pack.
            ontology: A dictionary for project ontology.
            project_configs: A dictionary for project configurations.
                Default to None.
            multi_ontology: A dictionary for multi_pack ontology.
                Default to {}.
            allow_overwrite: Allow overwriting textpacks with the same index.
                Default to True.
        """
        super().__init__(project_path)

        if not os.path.isdir(self._project_path):
            os.makedirs(self._project_path)

        self._allow_overwrite: bool = allow_overwrite
        self._textpack_id: int = 0

        # Create meta file
        with open(os.path.join(
            self._project_path,
            self.PROJECT_META_FILE
        ), "w") as f:
            json.dump({
                self.NAME_FIELD: project_name,
                self.TYPE_FIELD: project_type,
                self.ONTO_FIELD: ontology,
                self.CONF_FIELD: project_configs,
                self.MULT_FIELD: multi_ontology
            }, f)

        logger.info('Project["%s"] is saved under "%s".',
            project_name, self._project_path)

    def write_textpack(self, prefix: Union[int, str], textpack: str) -> int:
        """
        Write textpack to the project directory with standard naming scheme.
        It returns the current textpack index to the caller.

        Args:
            prefix: A string (e.g., pack_name) or integer (e.g., pack_id) that
                constructs the prefix of filename. The created file will be
                named `{prefix}.{index}.json`. Note: Any `\` will be translated
                into `_` in filename.
            textpack: A string representing serialized DataPack.

        Returns:
            textpack_id: An index indicating sequential order of textpack.
        """
        textpack_id = self._textpack_id
        prefix = str(prefix).replace('/', '_')

        # Delete textpacks with the same textpack_id if allowing overwrite
        if self._allow_overwrite:
            match = glob.glob(os.path.join(
                self._project_path,
                f"*.{textpack_id}.json"
            ))
            for old_textpack in match:
                os.remove(old_textpack)

        with open(os.path.join(
            self._project_path,
            f"{prefix}.{textpack_id}.json"
        ), "w") as f:
            f.write(textpack)
            self._textpack_id += 1
        return textpack_id
