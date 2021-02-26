#! /bin/bash

if [ ! -f db.sqlite3 ]; then
    python manage.py migrate 
	cat sample_sql/*.sql | sqlite3 db.sqlite3
    echo 'db.sqlite3 created'
fi

python manage.py runserver
