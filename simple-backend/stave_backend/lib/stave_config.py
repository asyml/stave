"""
StaveConfig provides a basic interface to get/set configuration for Stave.
"""

import os
import json
import logging
from enum import Enum
from typing import Dict, Any, Iterator

logger = logging.getLogger(__name__)

__all__ = [
    "StaveConfig"
]


class Fields(Enum):
    """
    Configurable fields of stave. Those do not start with '_' are treated
    as public fields that can be showed and configured in CLI.
    """
    DB_FILE = "db_file"
    LOG_FILE = "log_file"
    ALLOWED_HOSTS = "allowed_hosts"
    DJANGO_SETTINGS_MODULE = "django_settings_module"
    SECRET_KEY = "_secret_key"
    DJANGO_SETTINGS = "_django_settings"

    @classmethod
    def itervalue(cls) -> Iterator[str]:
        return (field.value for field in cls)


class StaveConfig:
    """
    Provide basic getter/setter interfaces for all configurable paramaters
    of Stave. Example usage:

        sc = StaveConfig()
        print(sc.db_file)
        sc.log_file = "./log"

    """

    ADMIN_USERNAME = "admin"
    ADMIN_PASSWORD = "admin"

    CONFIG_PATH = os.path.join(os.path.expanduser('~'), ".stave")
    CONFIG_FILE = os.path.join(CONFIG_PATH, "stave.conf")
    README_FILE = os.path.join(CONFIG_PATH, "README.md")

    DEFAULT_CONFIG_JSON = {
        Fields.DJANGO_SETTINGS_MODULE.value: None,

        # A basic django settings for Stave to run
        Fields.DJANGO_SETTINGS.value: {
            "ROOT_URLCONF": "stave_backend.urls",
            "INSTALLED_APPS": [
                'stave_backend',
                'django.contrib.admin',
                'django.contrib.auth',
                'django.contrib.contenttypes',
                'django.contrib.sessions',
                'django.contrib.messages',
                'django.contrib.staticfiles',
                'guardian',
            ],
            "MIDDLEWARE": [
                'django.middleware.security.SecurityMiddleware',
                'django.contrib.sessions.middleware.SessionMiddleware',
                'django.middleware.common.CommonMiddleware',
                'django.contrib.auth.middleware.AuthenticationMiddleware',
                'django.contrib.messages.middleware.MessageMiddleware',
                'django.middleware.clickjacking.XFrameOptionsMiddleware',
            ],
            "DATABASES": {
                'default': {
                    'ENGINE': 'django.db.backends.sqlite3',
                    'NAME': os.path.join(CONFIG_PATH, "db.sqlite3"),
                }
            },
            "SECRET_KEY": None,
            "ALLOWED_HOSTS": ["localhost"],
            "LOGGING": {
                'version': 1,
                'disable_existing_loggers': False,
                'formatters': {
                    'verbose': {
                        'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
                        'style': '{',
                    },
                    'simple': {
                        'format': '[{levelname}] {asctime} {module} {message}',
                        'style': '{',
                    },
                },
                'handlers': {
                    'console': {
                        'class': 'logging.StreamHandler',
                        'formatter': 'simple',
                    },
                    'file': {
                        'level': 'NOTSET',
                        'class': 'logging.FileHandler',
                        'filename': os.path.join(CONFIG_PATH, "log"),
                        'formatter': 'verbose'
                    },
                },
                'root': {
                    'handlers': ['console', 'file'],
                    'level': 'NOTSET',
                },
                'loggers': {
                    'django': {
                        'handlers': ['console', 'file'],
                        'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
                        'propagate': False,
                    },
                },
            }
        }
    }

    README = (
        "\nStave configuraion\n"
        "\n- Stave can be configured in two modes:\n"
        "\t- Simple Mode: You can simply use the default settings and stave "
        "will take care of most of the configuration tasks for you. You do not"
        " need to worry about the details about django under the hood. You may"
        " customize some parameters like database path, log file, allowed "
        "hosts, etc., but most times you can simply accept all the default "
        "values and stave will be good to go.\n"
        "\t- Flexible Mode: If you already have a django project, or you are "
        "familiar with django and want more flexibility, you may provide your"
        " own customized settings from a django project. In order to add stave"
        " into your project, refer to https://github.com/asyml/stave/blob/master/simple-backend/stave_backend/settings.py"
        " to see how to properly setup your django project to support stave."
        " After that you may modify the settings at your will.\n"
        "\n- How to config:\n"
        "\t- Simple Mode: Leave 'django_settings_module' field empty. If you "
        "want to swtich to simple mode from flexbile mode, you can set it to "
        "an empty string '' or None.\n"
        "\t- Flexible Mode: Set 'django_settings_module' field to the module"
        "path to your 'settings.py' file. Note that after you set this field,"
        " the rest of the django configuration of stave will be deprecated "
        "and all the relevant settings will be routed to the settings "
        "module you provide."
    )

    def __getattr__(self, name: str) -> Any:
        """
        Getter for attributes in Fields. It will load from CONFIG_FILE and
        route to the right config based on attribute name.
        """
        if name not in Fields.itervalue():
            return self.__getattribute__(name)

        config: Dict[str, Any] = self._load_config()
        setting: str = Fields.DJANGO_SETTINGS.value
        if name == Fields.DB_FILE.value:
            return config[setting]["DATABASES"]["default"]["NAME"]
        elif name == Fields.LOG_FILE.value:
            return config[setting]["LOGGING"]["handlers"]["file"]["filename"]
        elif name == Fields.SECRET_KEY.value:
            return config[setting]["SECRET_KEY"]
        elif name == Fields.ALLOWED_HOSTS.value:
            return config[setting]["ALLOWED_HOSTS"]
        else:
            return config.get(name)

    def __setattr__(self, name: str, value: Any) -> None:
        """
        Setter for attributes in Fields. It will load from CONFIG_FILE,
        overwrite the corresponding config based on attribute name, and then
        save it back to CONFIG_FILE. The access pattern of each config here
        should be equivalent to "__getattr__".
        """
        if name not in Fields.itervalue():
            return super().__setattr__(name, value)

        config: Dict[str, Any] = self._load_config()
        setting: str = Fields.DJANGO_SETTINGS.value
        if name == Fields.DB_FILE.value:
            config[setting]["DATABASES"]["default"]["NAME"] = value
        elif name == Fields.LOG_FILE.value:
            config[setting]["LOGGING"]["handlers"]["file"]["filename"] = value
        elif name == Fields.SECRET_KEY.value:
            config[setting]["SECRET_KEY"] = value
        elif name == Fields.ALLOWED_HOSTS.value:
            config[setting]["ALLOWED_HOSTS"] = (
                value.split() if isinstance(value, str) else value
            )
        else:
            config[name] = value

        self._save_config(config)

    @classmethod
    def _save_config(cls, config: Dict[str, Any]):
        """
        Save the configuration of Stave

        Args:
            config: A dict of Stave config. It should have the same format
                with DEFAULT_CONFIG_JSON.
        """
        if not os.path.isdir(cls.CONFIG_PATH):
            os.mkdir(cls.CONFIG_PATH)
        with open(cls.CONFIG_FILE, "w") as f:
            json.dump(config, f, indent=4)
        if not os.path.exists(cls.README_FILE):
            with open(cls.README_FILE, "w") as f:
                f.write(cls.README)

    @classmethod
    def _load_config(cls) -> Dict[str, Any]:
        """
        Load or create configuration of Stave
        """
        if not os.path.exists(cls.CONFIG_FILE):
            cls._save_config(cls.DEFAULT_CONFIG_JSON)
        with open(cls.CONFIG_FILE, "r") as f:
            return json.load(f)

    @classmethod
    def is_initialized(cls) -> bool:
        """
        Check if the config file exists.
        """
        if not os.path.isdir(cls.CONFIG_PATH):
            return False
        return os.path.exists(cls.CONFIG_FILE)

    def show_config(self) -> None:
        """
        Show public configuration of Stave
        """
        print(json.dumps(
            {
                field: getattr(self, field)
                for field in Fields.itervalue()
                if not field.startswith('_')
            },
            sort_keys=True,
            indent=4
        ))
