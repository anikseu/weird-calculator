# Overview

The project has been created with React for frontend and Laravel for backend. 

## Installation

First, lets start with the backend laravel application, run the following commands:
### `cd weird-calculator-api/`
### `composer install`
### `php artisan serve`

This will launch the backend application on [http://localhost:8000](http://localhost:8000). 

Now let's step back to weird-calculator react directory and navigate to .env file and make sure the env file has the backend application url correctly on REACT_APP_API_URL variable. Then, run the following commands: 

### `npm install`
### `npm start`

This will launch the frontend of the application.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Prerequisite 
Node v14, PHP8, Composer