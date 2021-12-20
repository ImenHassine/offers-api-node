## À propos

Ce project permet de gérer tous les offres .

## About Project

This project allows you to manage all types of users, offres and payment .

# Node API boilerplate 

A boilerplate for building RESTful APIs using Node.js, PostgreSQL, sequelize.

## Features

- Express
- REST API
- PostgreSQL

# Getting started

## Installation

1. Install [Node.JS](https://nodejs.org/en/) LTS version

Node.js v12.16.1 or higher is required.

npm v6.13.4 or higher is required.

3. Install PostgreSQL

psql 12.4 (Ubuntu 18.4-1.pgdg16.04+1)) is required.

4. Clone this repository and enter on the respective folder

- `git clone ssh://git@gitlab.com:e1819/offer-api.git`

- `cd offer-api`

5. Install dependencies running: `yarn` or `npm install`


## Things to do before run the project:

1. Create database (by follow the commands):

    ```offers_database
    $ sudo -u postgres psql

    $ CREATE DATABASE offers;
 
    $ \c offers; 
 
    $ \d (To see all the tables in offers database)

    ```
    
```

2. Run : `nodemon server` 

## Directory  Structure

├── /app
|   ├── /config
|   ├── /controllers
|   ├── /helpers
|   ├── /middleware
|   ├── /models
|   ├── /routes
|   ├── /services
|   ├── /validators
|   ├── /utils
├── /assets
├── /docs
├── /logs

```


