#!/bin/sh


python manage.py migrate
gunicorn config.wsgi --bin=0.0.0.0:80
