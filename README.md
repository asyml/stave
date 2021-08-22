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
For more information, refer to:
```bash
stave config -h
```

#### More about the command line tool:
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
