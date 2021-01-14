#! /bin/bash

if [ ! -f db.sqlite3 ]; then
	cat example_db.sql eliza.sql | sqlite3 db.sqlite3
    echo 'db.sqlite3 created'
fi

python manage.py runserver
