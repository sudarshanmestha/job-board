#!/bin/sh

python manage.py makemigrations account socialaccount
python manage.py migrate
gunicorn config.wsgi --bin=0.0.0.0:80
