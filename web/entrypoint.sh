#!/bin/sh

# Prepare Django
./manage.py migrate --noinput
./manage.py demouser

# Start
exec "$@"
