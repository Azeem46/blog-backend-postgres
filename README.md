# Blog Backend

## Overview

This repository contains the backend implementation for a blog application built using **Node.js**, **Express.js**, and **PostgreSQL**. The application allows users to create posts, comment on them, bookmark posts, and manage users. It follows a RESTful API architecture with a well-structured folder hierarchy, ensuring clean and maintainable code.

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

- **User Management**: Register, login, and manage users.
- **Posts**: Create, update, delete, and view blog posts.
- **Comments**: Add, update, and delete comments on posts.
- **Bookmarks**: Bookmark/unbookmark posts.
- **Authentication & Authorization**: JWT-based authentication, including role-based access.
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

Key Tables

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
- **DB_PASSW**ORD: Password for PostgreSQL.
- **DB_NAME:** Name of the PostgreSQL database.
- **JWT_SECRET:** Secret key for signing JWT tokens.

## API Documentation

## Error Handling

The project includes global error handling middleware in Express. All errors are logged, and appropriate HTTP status codes are returned to the client with detailed error messages when necessary.

##Testing

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
