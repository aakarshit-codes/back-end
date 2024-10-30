# Book Management API

This is a simple REST API for managing a collection of books, built using Node.js and Express. The API allows you to perform CRUD operations: create, read, update, and delete books.

### Environment Variables Setup

To keep sensitive information secure, we use environment variables. Create a `.env` file in the root of your project and add the following variables:

```plaintext 
SECRET_KEY=your_secret_key
DB_USER=your_database_username
DB_PASS=your_database_password
DB_NAME=your_database_name
```

- SECRET_KEY: A unique, random string used for signing JWT tokens.
- DB_USER: The username of your MongoDB database user.
- DB_PASS: The password for your MongoDB database user.
- DB_NAME: The name of your MongoDB database.

## Features

- **GET** `/books` - Retrieve a list of all books
- **POST** `/books` - Add a new book to the collection
- **PUT** `/books/:id` - Update details of an existing book by ID
- **DELETE** `/books/:id` - Delete a book by ID

## Technologies Used
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Authentication**: JSON Web Token (JWT)
- **Environment Management**: dotenv

## Prerequisites

- [Node.js](https://nodejs.org/) and npm (Node Package Manager) installed.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account for hosting your database in the cloud.
- The server will run on [http://localhost:3000](http://localhost:3000).

## API Endpoints

| Method | Endpoint       | Description                            |
|--------|----------------|----------------------------------------|
| GET    | `/books`       | Retrieve a list of all books           |
| POST   | `/books`       | Add a new book                         |
| POST   | `/login`       | Logs a user in and returns a JWT token |
| POST   | `/register`    | Registers a new user                   |
| PUT    | `/books/:id`   | Update book details by ID              | 
| DELETE | `/books/:id`   | Delete a book by ID                    |

## Security Considerations
- **Environment Variables**: Sensitive information (e.g., SECRET_KEY, database credentials) is stored in a .env file for security. Make sure to never expose this file in public repositories.
- **JWT Authentication**: Used to securely authenticate users, preventing unauthorized access to protected resources.


## Error Handling

The API includes basic error handling for invalid routes and internal server errors.

## Testing the API

You can test the API using [Postman](https://www.postman.com/) or a similar API client to send requests to each endpoint.