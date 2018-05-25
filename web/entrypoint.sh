#!/bin/sh

# Wait for postgres
bash -c "while ! nc -w 1 -z db 5432; do sleep 0.1; done"

# Prepare Django
./manage.py migrate --noinput
./manage.py demouser

# Start
exec "$@"
