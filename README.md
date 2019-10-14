# HackerBay Backend Interview

An API that allows a user to create thumbnails and patch documents.

## Getting Started

To get the application up and running on your computer clone the application by running `git clone https://github.com/oma0256/hackerbay-backend.git` in your terminal.

### Prerequisites

You have to have nodejs installed on your computer.

### Local Setup

#### Installing

Navigate into the project's root directory in the terminal the run `npm install` to install the project's dependencies.

#### Running the tests

To run the tests run `npm test` in your terminal.

#### Running the application

To start the application run `npm start` in your terminal. You can access the swagger documentation of the application using route `http://localhost:8000`.

## Features

- Login to application
- Create a thumbnail
- Patch a document

## Endpoints

| HTTP Method | End point   | Action                                          |
| ----------- | ----------- | ----------------------------------------------- |
| POST        | /login      | Login to get a token to access protected routes |
| POST        | /thumbnail  | Creates a thumbnail for an image                |
| POST        | /json-patch | Patches a document                              |

## Built With

- Nodejs using Expressjs and Mocha as the testing framework.

## Author

[Jonathan Omarwoth](https://github.com/oma0256)
