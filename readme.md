# Book Management API

This is a simple REST API for managing a collection of books, built using Node.js and Express. The API allows you to perform CRUD operations: create, read, update, and delete books.

## Features

- **GET** `/books` - Retrieve a list of all books
- **POST** `/books` - Add a new book to the collection
- **PUT** `/books/:id` - Update details of an existing book by ID
- **DELETE** `/books/:id` - Delete a book by ID

## Prerequisites

- [Node.js](https://nodejs.org/) and npm (Node Package Manager) installed
- The server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

| Method | Endpoint       | Description                     |
|--------|----------------|---------------------------------|
| GET    | `/books`       | Retrieve a list of all books   |
| POST   | `/books`       | Add a new book                 |
| PUT    | `/books/:id`   | Update book details by ID      |
| DELETE | `/books/:id`   | Delete a book by ID            |

## Error Handling

The API includes basic error handling for invalid routes and internal server errors.

## Testing the API

You can test the API using [Postman](https://www.postman.com/) or a similar API client to send requests to each endpoint.