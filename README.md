<div align="center">
   <img src="https://raw.githubusercontent.com/asyml/stave/master/public/logo-light-full-300.png"><br><br>
</div>

-----------------

[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](https://github.com/asyml/stave/blob/master/LICENSE)


**Stave** is an open source project for visualizing and annotating NLP tasks.

## Environment
The project is tested on:

Python 3.6+
Django 3.0.4
yarn 1.22.4

## Run server
- `cd simple-backend`
- make sure your `python` command is using python3, or use a virtual env by:
  - `python3 -m venv venv` create virtual env (skip if already created)
  - `. venv/bin/activate` use virtual env
- make sure django is installded, or install it by:
  - `python -m pip install Django`
- `./start-dev.sh`
  - This script will use the example db: `mv db.sqlite3.example db.sqlite3`
- go to http://127.0.0.1:8000/documents


## Start the Front End
After the server starts, then simply 
- yarn && yarn start

The default username/password for the demonstration data is admin/admin

