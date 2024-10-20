# Blog Backend

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue)

## Overview

This repository contains the backend implementation for a blog application built using **Node.js**, **Express.js**, and **PostgreSQL**. The application allows users to create posts, comment on them, bookmark posts. It follows a RESTful API architecture with a well-structured folder hierarchy, ensuring clean and maintainable code.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Database Schema](#database-schema)
5. [Installation](#installation)
6. [Environment Variables](#environment-variables)
7. [API Documentation](#api-documentation)
8. [Error Handling](#error-handling)
9. [Testing](#testing)
10. [Contributing](#contributing)
11. [License](#license)

## Technologies Used

- **Node.js**: JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **PostgreSQL**: Open-source relational database management system.
- **pg**: Node.js client for PostgreSQL for database connectivity.
- **JWT**: JSON Web Tokens for authentication and authorization.
- **bcrypt**: For password hashing.
- **dotenv**: For environment variable management.
- **ESLint & Prettier**: Code quality and formatting tools.

## Features

- **User Management**: Register, login.
- **Posts**: Create, update, delete, likePost and view blog posts.
- **Comments**: Add, update, and delete comments on posts.
- **Bookmarks**: Bookmark/unbookmark posts.
- **Authentication & Authorization**: JWT-based authentication.
- **Database Integration**: PostgreSQL with raw SQL queries for database operations.

## Project Structure

```bash
blog-backend/
│
├── controllers/            # Route controllers to handle API requests
│   ├── BookmarkController.js
│   ├── CommentController.js
│   ├── PostController.js
│   └── UserController.js
│
├── middleware/             # Middleware for authentication and validation
│   ├── auth.js
│   └── validateUser.js
│
├── migrations/             # SQL migration files for database setup
│   └── 001_create_tables.sql
│
├── queries/                # SQL queries for the different models
│   ├── bookmarkQueries.js
│   ├── commentQueries.js
│   ├── postQueries.js
│   └── userQueries.js
│
├── routes/                 # API route definitions
│   ├── bookmarkRoutes.js
│   ├── commentRoutes.js
│   ├── postRoutes.js
│   └── userRoutes.js
│
├── services/               # Database connection and pooling
│   └── db.js
│
├── .env                    # Environment variables file
├── .gitignore              # Git ignore file
├── package.json            # Node.js dependencies and scripts
├── package-lock.json       # Dependency lock file
├── README.md               # Project documentation
└── server.js               # Entry point for the application

```

## Database

The database is managed using PostgreSQL. The migration file 001_create_tables.sql creates the required tables.

### Key Tables

- **Users**: Stores user details.
- **Posts**: Stores blog posts with references to the users who created them.
- **Comments**: Stores comments linked to posts.
- **Bookmarks**: Stores bookmarked posts for each user.
- You can find the SQL schema under migrations/001_create_tables.sql.

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Steps

1. Clone the repository:

```bash
git clone https://github.com/yourusername/blog-backend.git
```

2. Navigate to the project directory

```bash
cd blog-backend
```

3. Install the dependencies:

```bash
npm install
```

4. Set up PostgreSQL and create a database:

```sql
CREATE DATABASE blog_backend;
```

5. Run the migration to set up the database schema:

```bash
psql -U your_username -d blog_backend -f migrations/001_create_tables.sql
```

6. Create a .env file in the root of the project:

```bash
touch .env
```

7. Add the following environment variables to .env:

```makefile
PORT=5000
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=blog_backend
JWT_SECRET=your_jwt_secret_key
```

8. Start the server:

```bash
npm start
```

## Environment Variables

The project uses environment variables to manage sensitive information and configurations. The following variables should be defined in a .env file:

- **PORT**: The port on which the server will run (default: 5000).
- **DB_HOST:** Hostname of your PostgreSQL server.
- **DB_USER:** Username for PostgreSQL.
- **DB_PASSWORD**: Password for PostgreSQL.
- **DB_NAME:** Name of the PostgreSQL database.
- **JWT_SECRET:** Secret key for signing JWT tokens.

## API Documentation

## Authentication

### Register

**Endpoint:** `POST /user/signup`

**Request Body:**

```json
{
  "name": "JhonDoe",
  "email": "jhondoe@gmail.com",
  "password": "Password1!"
}
```

**Response:**

```json
{
  "user": {
    "id": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
    "email": "jhondoe@gmail.com",
    "password": "$2a$12$/oCRu/AC/Ay.ybiUXPwMEOM4R1574jwQu2nTbpniCy7O15AMRGMhG",
    "name": "JhonDoe",
    "join_date": "2024-10-18T12:16:17.337Z",
    "post_count": 0
  }
}
```

### LOGIN

**After you login and get token, copy that token and go to authorization header select bearer token and paste under that**

**Endpoint:** `POST /user/signin`

**Request Body:**

```json
{
  "email": "jhondoe@gmail.com",
  "password": "Password1!"
}
```

**Response:**

```json
{
  "message": "User signed in successfully",
  "user": {
    "email": "jhondoe@gmail.com",
    "id": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
    "name": "JhonDoe",
    "joinDate": "2024-10-18T12:16:17.337Z",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Impob25kb2VAZ21haWwuY29tIiwiaWQiOiJhMmJlMGU2Zi1jZmQxLTQ2YmYtYWE2OC1iYTI3NjIwYmMyM2YiLCJpYXQiOjE3MjkyNTM5MzcsImV4cCI6MTc2MDgxMTUzN30.4TI4j3amxA7oyU0FvzW-phWn_xvcom5049XahUwnFcE"
  }
}
```

## POSTS

**Make sure to copy the token you recieve when logging and paste that under bearer token in authorization header otherwise you will not be able to make the request for POSTS**

### CREATE A POST

**Endpoint:** `POST /posts`

**Request Body:**

```json
{
  "title": "Dragon ball Z",
  "message": "One of the best anime of all time",
  "selectedFile": "https://img.png.com",
  "tags": ["anime", "dragon ball"]
}
```

**Response:**

```json
{
  "id": 17,
  "title": "Dragon ball Z",
  "message": "One of the best anime of all time",
  "name": "JhonDoe",
  "tags": ["anime", "dragon ball"],
  "selected_file": "https://img.png.com",
  "likes": null,
  "created_at": "2024-10-18T12:25:57.297Z",
  "creator": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
  "views": 0,
  "creator_name": "JhonDoe",
  "uuid_id": "2fcf82ac-9349-4f06-8345-0de7b3fabf38"
}
```

### Update the Post

**Endpoint:** `POST /posts/:id`

**Request Body:**

```json
{
  "title": "Dragon ball Super",
  "message": "One of the best anime of all time, one of the best animations",
  "selectedFile": "https://img.png.com",
  "tags": ["anime", "dragon ball", "goku"]
}
```

**Response:**

```json
{
  "title": "Dragon ball Super",
  "message": "One of the best anime of all time, one of the best animations",
  "tags": ["anime", "dragon ball", "goku"],
  "selected_file": "https://img.png.com",
  "id": "17"
}
```

### GET POST BY ID

**Endpoint:** `GET /posts/:id`

**Response:**

```json
{
  "id": 17,
  "title": "Dragon ball Super",
  "message": "One of the best anime of all time, one of the best animations",
  "name": "JhonDoe",
  "tags": ["anime", "dragon ball", "goku"],
  "selected_file": "https://img.png.com",
  "likes": null,
  "created_at": "2024-10-18T12:25:57.297Z",
  "creator": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
  "views": 0,
  "creator_name": "JhonDoe",
  "uuid_id": "2fcf82ac-9349-4f06-8345-0de7b3fabf38"
}
```

### GET POSTS BY CREATOR

**Endpoint:** `GET /posts/creator/:creator`

**Response:**

```json
[
  {
    "id": 17,
    "title": "Dragon ball Super",
    "message": "One of the best anime of all time, one of the best animations",
    "tags": ["anime", "dragon ball", "goku"],
    "selected_file": "https://img.png.com",
    "likes": null,
    "created_at": "2024-10-18T12:25:57.297Z",
    "views": 0,
    "creator_name": "JhonDoe",
    "creator_email": "jhondoe@gmail.com"
  }
]
```

### GET LATEST POSTS

**If you create multiple post then you will get to see how it actuall looks below is how it looks after multiple post created it sort by latest post created**

**Endpoint:** `GET /posts/latest`

**Response:**

```json
[
  {
    "id": 17,
    "title": "Dragon ball Super",
    "message": "One of the best anime of all time, one of the best animations",
    "name": "JhonDoe",
    "tags": ["anime", "dragon ball", "goku"],
    "selected_file": "https://img.png.com",
    "likes": null,
    "created_at": "2024-10-18T12:25:57.297Z",
    "creator": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
    "views": 0,
    "creator_name": "JhonDoe",
    "uuid_id": "2fcf82ac-9349-4f06-8345-0de7b3fabf38"
  },
  {
    "id": 16,
    "title": "DRAGON BALL SPARKING ZERO",
    "message": "Best Dragon ball game at the moment",
    "name": "Jhon",
    "tags": ["Dragon ball", "Sparking Zero", "Game"],
    "selected_file": "https://img.png.com",
    "likes": ["c5726f65-ef16-4887-a429-fafcd5495fb0"],
    "created_at": "2024-10-17T09:40:12.170Z",
    "creator": "c5726f65-ef16-4887-a429-fafcd5495fb0",
    "views": 10,
    "creator_name": "Jhon",
    "uuid_id": "4d87b7d6-356e-47b6-b75d-9e3812a6e19a"
  },
  {
    "id": 15,
    "title": "Your Post Title",
    "message": "This is the content of your post.",
    "name": "Jhon",
    "tags": ["example", "post", "tags"],
    "selected_file": null,
    "likes": null,
    "created_at": "2024-10-16T12:48:10.562Z",
    "creator": "c5726f65-ef16-4887-a429-fafcd5495fb0",
    "views": 0,
    "creator_name": "Jhon",
    "uuid_id": "8d125ccd-04ff-4baa-a256-c63a88b900ff"
  },
  {
    "id": 14,
    "title": "Your Post Title",
    "message": "This is the content of your post.",
    "name": "Jhon",
    "tags": ["example", "post", "tags"],
    "selected_file": null,
    "likes": null,
    "created_at": "2024-10-16T12:36:25.389Z",
    "creator": "c5726f65-ef16-4887-a429-fafcd5495fb0",
    "views": 0,
    "creator_name": "Jhon",
    "uuid_id": "2e37ce89-475c-441e-a274-25fa8950dabc"
  }
]
```

### LIKE THE POST

**Endpoint:** `GET /posts/:id/likePost`

**Response:**

```json
{
  "likes": ["a2be0e6f-cfd1-46bf-aa68-ba27620bc23f"]
}
```

**After liking the post then send get request to GET POST BY ID and see the result**

**After you get the post by id**

```json
{
    "id": 17,
    "title": "Dragon ball Super",
    "message": "One of the best anime of all time, one of the best animations",
    "name": "JhonDoe",
    "tags": [
        "anime",
        "dragon ball",
        "goku"
    ],
    "selected_file": "https://img.png.com",
    "likes": [
        "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f" ---likes added
    ],
    "created_at": "2024-10-18T12:25:57.297Z",
    "creator": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
    "views": 0,
    "creator_name": "JhonDoe",
    "uuid_id": "2fcf82ac-9349-4f06-8345-0de7b3fabf38"
}
```

### Increment view of Post

**Endpoint:** `GET /posts/:id/likePost`

**Response:**

```json
{
  "id": 17,
  "title": "Dragon ball Super",
  "message": "One of the best anime of all time, one of the best animations",
  "name": "JhonDoe",
  "tags": ["anime", "dragon ball", "goku"],
  "selected_file": "https://img.png.com",
  "likes": ["a2be0e6f-cfd1-46bf-aa68-ba27620bc23f"],
  "created_at": "2024-10-18T12:25:57.297Z",
  "creator": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
  "views": 10,
  "creator_name": "JhonDoe",
  "uuid_id": "2fcf82ac-9349-4f06-8345-0de7b3fabf38"
}
```

## Bookmark

### Create Bookmark

**Endpoint:** `POST /bookmarks`

**Request Body:**

```json
{
  "userId": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
  "postId": "17"
}
```

**Response:**

```json
{
  "id": 4,
  "user_id": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
  "created_at": "2024-10-19T09:48:25.093Z",
  "post_id": 17
}
```

### GET Bookmarks

**Endpoint:** `GET /bookmarks`

**Response:**

```json
[
  {
    "id": 4,
    "post_id": 17,
    "title": "Dragon ball Super",
    "message": "One of the best anime of all time, one of the best animations",
    "selected_file": "https://img.png.com"
  }
]
```

### REMOVE Bookmarks

**Endpoint:** `DELETE /bookmarks/:id`

**Response**

```json
{
  "message": "Bookmark removed"
}
```

## Comment

### Create A Comment

**Endpoint:** `POST /comments`

**Request Body:**

```json
{
  "postId": "17",
  "text": "This is nice post"
}
```

**Response:**

```json
{
  "id": 14,
  "postId": "17",
  "userId": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
  "text": "This is a good post",
  "createdAt": "2024-10-19T10:13:30.754Z"
}
```

### Get Comments

**Endpoint:** `GET /comments/:postId`

**Response**

```json
{
  "postId": "17",
  "userId": "a2be0e6f-cfd1-46bf-aa68-ba27620bc23f",
  "text": "This is nice post",
  "createdAt": "2024-10-19T09:54:03.999Z"
}
```

### UPDATE the comment

**Endpoint:** `PATCH /comments/:id`

**Request Body:**

```json
{
  "postId": "17",
  "text": "This is a very good post"
}
```

**Response:**

```json
{
  "id": "14",
  "text": "This is a very good post",
  "updatedAt": "2024-10-19T10:15:59.241Z"
}
```

### DELETE the Comment

**Endpoint:** `DELETE /comments/:id`

**Response**

```json
{
  "message": "Comment deleted successfully"
}
```

## Error Handling

The project includes global error handling middleware in Express. All errors are logged, and appropriate HTTP status codes are returned to the client with detailed error messages when necessary.

## Testing

Testing is implemented using Jest for unit and integration tests. To run the tests:

```bash
npm test
```

## Contributing

Contributions are welcome! Please follow the guidelines below:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature-name).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-name).
5. Create a Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
