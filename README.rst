========
banktest
========

This is an example of a Django application ready to be deployed with Docker, it uses: NGINX + uWSGI + Django 2 + Python 3 + PostgreSQL + Django REST framework + Angular 6

* The deployed application is a list of Django Users with basic user information + IBAN (bank account)
* The user may login using user + password or Google Authentication system if the email account matchs with Google's one.
* If user is a superadmin it will be able to list and operate over all registered users
* If user is a normal user it will be able to operate only over the users he/she may created


***********
Intallation
***********

1. I assume you have `docker <https://docs.docker.com/install/>`_ and `docker-compose <https://docs.docker.com/compose/install/>`_ installed.

2. Clone this repository::

    git clone https://github.com/juanmitaboada/banktest

3. Go into the folder::

   cd banktest

4. Launch docker-compose on the folder::

    docker-compose up

5. Login to the website at http://127.0.0.1:8080 using username "demo" and password "demo"


******
Author
******

Juanmi Taboada - `www.juanmitaboada.com <http://www.juanmitaboada.com/>`_
