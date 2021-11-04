<div align="center">
   <img src="https://raw.githubusercontent.com/asyml/stave/master/public/Stave-dark-text@1x.png"><br><br>
</div>

-----------------

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/asyml/stave/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/asyml/stave.svg?branch=master)](https://travis-ci.org/asyml/stave)

This project is currently under development.

**Stave** is a fast, lightweight, extensible web-based text annotation and visualization tool designed to support a wide range of data types and NLP tasks. Stave offers the following features:
  
- **Semantic Annotation**: supports both template and custom data types
- **Multi-document Annotation**: supports cross-document annotations and coreference
- **Customizable Interface**: supports creation of task-specific interface with independently developed plugins
- **Machine-Human Collaboration**: keeps human in the loop to verify and correct machine suggestions 
- **Easy Integration**: supports seamless integration with pre-built NLP workflows 
- **Safe Data Serialization**: supports a JSON-serializable format for easy data saving, loading and distribution 

Stave was originally developed and is actively contributed by [Petuum](https://petuum.com/) in collaboration with other institutes. A mirror of this repository is maintained by [Petuum Open Source](https://github.com/petuum).

## Get Started
#### Installation
```bash
pip install stave
```
#### Quick Start
 ```bash
stave -s start -l -o
```
This will start the Stave server with example project loaded. `-s` allows Stave to run with all the default configuration. `-l` will load example projects and `-o` will open a browser window. If you want to start Stave as a headless server, simply remove the `-o` flag. You can log in with default user name `admin` and default password `admin`. You can start viewing the projects and some annotations/applications that we have prepared.

Or if you just want to start Stave from scratch, you can:

```bash
stave start
```
You can still log in with default user name `admin` and default password `admin`, which leads you to an empty project page. 

At any time, you can still load the example projects:
```bash
stave load-samples
```

By default the Stave server runs at http://localhost:8888. If you need to switch the port, you can add `-n` to specify the port number. For example, the following command will start a Stave service at http://localhost:8002.
```bash
stave start -n 8002
```
For more options to start Stave server, refer to:
```bash
stave start -h
```
#### Stave Configuration
After you start the Stave server, a `.stave/` folder is automatically created under your home directory `~`. It has the following structure:
```
~/.stave/
---- stave.conf
---- db.sqlite3
---- log
```
- `stave.conf` holds a json object of configurations.
- `db.sqlite3` is the default database for Stave server.
- `log` is the default logging file.

You can view or update the configuration by running the subcommand `config`. 
You may follow the prompts to interactively set up the configuration:
```bash
stave config -i
```
Stave CLI allows you to configure the database file, log file, the allowed hosts, etc. For more options, run
```bash
stave config -h
```
and you shall see the following help message:
```bash
usage: stave config [-h] [-i] [-s DJANGO_SETTINGS_MODULE] [-d DB_FILE]
                    [-l LOG_FILE] [-a ALLOWED_HOSTS [ALLOWED_HOSTS ...]]

optional arguments:
  -h, --help            show this help message and exit
  -i, --interact-config
                        Interactively set up the configuration
  -s DJANGO_SETTINGS_MODULE, --django-settings-module DJANGO_SETTINGS_MODULE
                        Module path to settings.py of django project. If you
                        have not set up any django project, you should leave
                        this field empty and stave will use its default
                        configuration. To set this field you should already
                        have a django project and the 'settings.py' file under
                        your project must be accessible from PYTHONPATH so
                        that django can import it as a module. Example:
                        'myproject.settings'
  -d DB_FILE, --db-file DB_FILE
                        Path to database file of Stave
  -l LOG_FILE, --log-file LOG_FILE
                        Path to log file for logging
  -a ALLOWED_HOSTS [ALLOWED_HOSTS ...], --allowed-hosts ALLOWED_HOSTS [ALLOWED_HOSTS ...]
                        A list of strings representing the host/domain names
                        that stave can serve.
```
For example, you can change the path of database file by running:
```bash
stave config -d ~/db.sqlite3
```
You may also add your own host names to the allowed hosts that Stave can serve:
```bash
stave config -a localhost myhost1.com myhost2.com
```

#### Import and Export
Stave provides a set of interfaces that allow you to import/export projects from/to disk. This is useful when you need to transfer Stave projects between backend database and local storage.

To export a project, you need to specify the path to store the project and its database id (which can be retrieved from URL, e.g., the id of project at http://localhost:8888/project/3 is 3). For example, the following command will save project with `id=3` to `~/project_3`:
```bash
stave export ~/project_3 3
```
Note that you will be prompted to enter your username and password before moving forward.

Now that you've saved a Stave project to a directory, you can either render this project in viewer mode
```bash
stave start -o -p ~/project_3
```
or import it to the database (which also requires authentication with username and password)
```bash
stave import ~/project_3
```
`stave import` is also useful when you use [StaveProcessor](https://github.com/asyml/forte/blob/master/forte/processors/stave/stave_processor.py#L46) inside a forte pipeline and want to save the generated visualization to database. `StaveProcessor` normally would save a Stave project to a folder (by default the name of folder is `Auto generated project`), and you can import this folder into stave backend by running
```bash
stave import PATH_TO_STAVE_PROJECT
```

#### More about the command line tool
To learn more about Stave CLI, run the following command to see the help message:
```bash
stave -h
```

## Developer Quick Start
#### Environment
The project is tested on:

Python 3.6+
Django 3.2.4
yarn 1.22.10

#### Run Django server
- `cd simple-backend`
- make sure your `python` command is using python3, or use a virtual env by:
  - `python3 -m venv venv` create virtual env (skip if already created)
  - `. venv/bin/activate` use virtual env
- make sure django is installded, or install it by:
  - `python -m pip install Django`
- `./start-dev.sh`
  - This script will create an example sqlite3 DB from SQL: `db.sqlite3`


#### Start the Frontend
After the server starts, then simply 
- yarn && yarn start
- go to http://127.0.0.1:8000

The default username/password for the demonstration data is admin/admin

### License

[Apache License 2.0](./LICENSE)

### Companies and Universities Supporting Stave
<p float="left">
   <img src="./docs/_static/img/Petuum.png" width="200" align="top">
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://asyml.io/assets/institutions/cmu.png", width="200" align="top">
</p>
