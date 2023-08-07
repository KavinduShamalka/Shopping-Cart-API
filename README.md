# Shopping Cart API

Welcome to the Shopping Cart API documentation! This API was developed using Node.js and Express, with MongoDB as the database.

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)
    - [User Signup and Login](#user-signup-and-login)
    - [Adding Items to Cart](#adding-items-to-cart)
    - [Viewing User Cart](#viewing-user-cart)
    - [Updating the Cart](#updating-the-cart)
    - [Deleting Items from Cart](#deleting-items-from-cart)
- [Installation](#installation)


## Introduction

The Shopping Cart API allows you to manage user carts with ease, providing a range of functionalities to enhance the shopping experience. Below, we'll guide you through the essential features step by step.

## Getting Started

To get started, make sure you have Node.js installed on your system and MongoDB. Then, follow these steps to set up and use the API.

### User Signup and Login

To access the API, users need to sign up or log in. Follow these endpoints to manage user authentication:

- `POST /api/users/signup`: Create a new user account.
- `POST /api/users/login`: Log in to an existing user account.

### View all users

To view the all users signup. Follow these endpoints to get all users:

- `GET /api/users`: Retrieve all the users.

### Adding Items to Cart

UserS can start adding items to their cart by giving his user ID. Use the following endpoint to add items:

- `POST /api/cart/add`: Add items to the user's cart.

### Viewing User Cart

Users can easily view the items in their cart. Use this endpoint to retrieve the user's cart:

- `GET /api/cart/view/:id`: Retrieve the user's cart and its contents.

### Updating the Cart

To make changes to the cart. Use the following endpoint to update the cart:

- `PUT /api/cart/update/:id`: Update the user's cart with new quantities or items.

### Deleting Items from Cart

If a user decides to remove items from their cart. Use this endpoint to delete items:

- `DELETE /api/cart/delete/:id`: Remove items from the user's cart.

## Installation

1. Clone the repository: `git clone https://github.com/KavinduShamalka/Shopping-Cart-API.git`

2. Install dependencies

        npm init 
        npm i nodemon
        npm i express
        npm i mongoose
        npm i bcryptjs


3. Start the server: `npm start`

## Usage

- Make requests to the API endpoints using API testing tools like Postman.

