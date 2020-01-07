#! /bin/bash

if [ ! -f db.sqlite3 ]; then
    cp db.sqlite3.backup db.sqlite3
    echo 'db.sqlite3 created'
fi

python manage.py runserver