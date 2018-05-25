FROM python:3.5.3
LABEL maintainer juanmitaboada
ENV PYTHONUNBUFFERED 1

# Install some necessary things.
# RUN apt-get update

# Copy operational files to the image
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy web files to the image
RUN mkdir /docker_web
WORKDIR /docker_web
COPY . /docker_web

# Upgrade pip
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# RUN pip install  -i  https://pypi.python.org/simple/  -r requirements.txt

# Collect static files from Django
RUN ./manage.py collectstatic --noinput
