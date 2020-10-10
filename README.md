<div align="center">
   <img src="https://raw.githubusercontent.com/asyml/stave/master/public/Stave-dark-text@1x.png"><br><br>
</div>

-----------------

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/asyml/stave/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/asyml/stave.svg?branch=master)](https://travis-ci.org/asyml/stave)

This project is currently under incubation.

**Stave** is a fast, light-weight, extensible web-based annotation and visualization system designed to support a wide range of text data and tasks. Rooting on modularized interface components and a syntax-rich serializable data format, Stave offers the following:
  - Off-the-shelf support to a wide range of NLP task
  - Extensible with plugins
  - Customizable data types
  - Multi-document Support
  - Integration to data science workflow
  - Universal and Safe Serialization

Stave was originally developed and is actively contributed by [Petuum](https://petuum.com/) in collaboration with other institutes. A mirror of this repository is maintained by [Petuum Open Source](https://github.com/petuum).

## Get Started
Packaging coming soon ...

## Developer Quick Start
#### Environment
The project is tested on:

Python 3.6+
Django 3.0.4
django-guardian
yarn 1.22.4

#### Run Django server
- `cd simple-backend`
- make sure your `python` command is using python3, or use a virtual env by:
  - `python3 -m venv venv` create virtual env (skip if already created)
  - `. venv/bin/activate` use virtual env
- make sure django is installded, or install it by:
  - `python -m pip install Django`
- `./start-dev.sh`
  - This script will use the example db: `mv db.sqlite3.example db.sqlite3`


#### Start the Front End
After the server starts, then simply 
- yarn && yarn start
- go to http://127.0.0.1:8000/documents

The default username/password for the demonstration data is admin/admin

### License

[Apache License 2.0](./LICENSE)

### Companies and Universities Supporting Forte
<p float="left">
   <img src="./docs/_static/img/Petuum.png" width="200" align="top">
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <img src="https://asyml.io/assets/institutions/cmu.png", width="200" align="top">
</p>

