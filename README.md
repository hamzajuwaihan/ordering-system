# Ordering System

A simple ordering system designed for a full stack developer position task.

## Table of Contents

- [Ordering System](#ordering-system)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)

## Introduction

This ordering system is a task project designed to demonstrate skills in building a backend-stack application. It allows users to place orders for products and manages the stock levels for ingredients accordingly.

## Features

- Place orders for products
- Automatically updates stock levels upon order placement
- Validates product availability before placing an order
- Simple and intuitive API endpoint
- Emails the merchant in case the alert thershold has been reached as per the configured in the porject

## Getting Started

Let us have a look over the project and understand what is the mechanisem that works on.

Basically, I defined the most basic elements of the system, which are the Ingredients.

The predefined ingredients are:

| Id in DB | ingredient_name |
|----------|----------------|
|    1     |      Beef      |
|    2     |     Cheese     |
|    3     |     Onion      |
|    4     |     Yogurt     |
|    5     |     Tomato     |

The predefined products are:

| Id in DB | product_name |
|----------|--------------|
|    1     |    Burger    |
|    2     |   Meatballs  |
|    3     |    Kibbeh    |

Now each product has one or more ingredient.

| Id in DB | product_id (products) | ingredient_id (ingredients) | ingredient_amount |
|----------|------------------------|------------------------------|-------------------|
|    1     |           1 (Burger)   |            1 (Beef)          |      150.00      |
|    2     |           1 (Burger)   |           2 (Cheese)         |       30.00      |
|    3     |           1 (Burger)   |           3 (Onion)          |       20.00      |
|    4     |           2 (Meatballs)|           3 (Onion)          |       10.00      |
|    5     |           2 (Meatballs)|           5 (Tomato)         |       10.00      |
|    6     |           3 (Kibbeh)   |            1 (Beef)          |       10.00      |
|    7     |           3 (Kibbeh)   |            3 (Onion)         |       10.00      |
|    8     |           3 (Kibbeh)   |            5 (Tomato)        |       10.00      |

An alert will be sent according to the below:

1. In the DB a stock table and *stock_fill_history* table, *stock_fill_history*.total_after_fill_amount column will be our reference assuming that it will be the filled amount.
2. Each Ingredient in *Stock* table has two columns, amount which is the current amount and last_fill_operation.
3. Compare the current amount to THRESHOLD **(configured in app.config.js)** × total_after_fill_amount.
4. if the current amount below THRESHOLD, we will check ingredient_alert_flag, if it was true, no action needed else it will trigger an email.

DB Structure:

![DB diagram](./DB%20kickOff/DB%20structure.png "DB structure, ER")

DB to restore: [DB to restore in PostgreSQL](./DB%20kickOff/db%20start.sql)

Swagger yaml file: [yaml to import to Swagger](./Swagger/openapi.yaml)


### Prerequisites

To run this project, you need to have the following software installed on your machine:

- Node.js.
- npm (Node Package Manager).
- Docker Desktop (optional).
- PostgreSQL in case you dont want to use Docker.


### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hamzajuwaihan/ordering-system.git


2. navigate to repo.

    ```bash
    cd ./ordering-system

3. rename ".envExample" to ".env" fill the info needed in case you dont want to use docker.

4. In case of using docker fill "docker-compose.yml" file with needed info, then the below command and thats it.

   ```bash
   docker-compose up --build

5. In case you dont want to use docker, you should either restore the DB (already provided in DB kickOff) in postgreSQL or create a DB with "ordering-system-db" and run the scripts in order in [create and insert SQL scripts](./docker-entrypoint-initdb.d/).

6. install node modules.

   ```bash
   npm inistall

7. build the project. (make sure you are in the project/repo directory)

   ```bash
   npm run build

8. start the project.

   ```bash
   npm run start

