#! /bin/bash

if [ ! -f db.sqlite3 ]; then
    cp db.sqlite3.example db.sqlite3
    echo 'db.sqlite3 created'
fi

python manage.py runserver
