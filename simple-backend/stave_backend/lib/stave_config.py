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
    DB_FILE = "db_file"
    LOG_FILE = "log_file"
    DJANGO_SETTINGS_MODULE = "django_settings_module"
    SECRET_KEY = "_secret_key"
    DJANGO_SETTINGS = "_django_settings"

    @classmethod
    def itervalue(cls) -> Iterator[str]:
        return (field.value for field in cls)


class StaveConfig:
    """
    A basic getter/setter interface for all public configurable
    paramaters of Stave. Example usage:

        sc = StaveConfig()
        print(sc.db_file)
        sc.log_file = "./log"

    """

    ADMIN_USERNAME = "admin"
    ADMIN_PASSWORD = "admin"

    CONFIG_PATH = os.path.join(os.path.expanduser('~'), ".stave")
    CONFIG_FILE = os.path.join(CONFIG_PATH, "stave.conf")

    DEFAULT_CONFIG_JSON = {
        Fields.DJANGO_SETTINGS_MODULE.value: None,
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

    def __getattr__(self, name: str) -> Any:
        if name not in Fields.itervalue():
            return self.__getattribute__(name)

        config: Dict[str, Any] = self._load_config()
        if name == Fields.DB_FILE.value:
            return config[
                Fields.DJANGO_SETTINGS.value
            ]["DATABASES"]["default"]["NAME"]
        elif name == Fields.LOG_FILE.value:
            return config[
                Fields.DJANGO_SETTINGS.value
            ]["LOGGING"]["handlers"]["file"]["filename"]
        elif name == Fields.SECRET_KEY.value:
            return config[Fields.DJANGO_SETTINGS.value]["SECRET_KEY"]
        else:
            return config.get(name)

    def __setattr__(self, name: str, value: Any) -> None:
        if name not in Fields.itervalue():
            return super().__setattr__(name, value)

        config: Dict[str, Any] = self._load_config()
        if name == Fields.DB_FILE.value:
            config[
                Fields.DJANGO_SETTINGS.value
            ]["DATABASES"]["default"]["NAME"] = value
        elif name == Fields.LOG_FILE.value:
            config[
                Fields.DJANGO_SETTINGS.value
            ]["LOGGING"]["handlers"]["file"]["filename"] = value
        elif name == Fields.SECRET_KEY.value:
            config[Fields.DJANGO_SETTINGS.value]["SECRET_KEY"] = value
        else:
            config[name] = value

        self._save_config(config)

    @classmethod
    def _save_config(cls, config: Dict[str, Any]):
        if not os.path.isdir(cls.CONFIG_PATH):
            os.mkdir(cls.CONFIG_PATH)
        with open(cls.CONFIG_FILE, "w") as f:
            json.dump(config, f)

    @classmethod
    def _load_config(cls) -> Dict[str, Any]:
        """
        Load or create configuration of Stave
        """
        if not os.path.isdir(cls.CONFIG_PATH):
            os.mkdir(cls.CONFIG_PATH)

        if not os.path.exists(cls.CONFIG_FILE):
            with open(cls.CONFIG_FILE, "w") as f:
                json.dump(cls.DEFAULT_CONFIG_JSON, f)

        with open(cls.CONFIG_FILE, "r") as f:
            return json.load(f)

    @classmethod
    def is_initialized(cls) -> bool:
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
