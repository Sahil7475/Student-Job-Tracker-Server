# Student Job Tracker API

A RESTful API backend for tracking job applications throughout the job search process. This project allows students to manage their job applications, including details like company, role, application status, and more.

## Features

- **User Authentication**: Secure signup and login functionality
- **Job Application Management**:
  - Add new job applications with essential details
  - List all applications with responsive layout
  - Filter applications by status or date
  - Update application status
  - Delete job entries

## Tech Stack

- **Node.js** with **Express.js** framework
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Joi** for input validation
- **CORS** for cross-origin resource sharing

## Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd student-job-tracker-api
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server
   ```
   npm start
   ```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login a user |

### Job Applications

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Get all job applications |
| GET | `/api/?status=` | Filter jobs by status |
| GET | `/api/?date=` | Filter jobs by date |
| POST | `/api/add` | Add a new job application |
| PATCH | `/api/:id/status` | Update job application status |
| DELETE | `/api/:id` | Delete a job application |


## Authentication

This API uses JWT (JSON Web Token) for authentication. After successful login or registration, a token is provided which must be included in the Authorization header for protected routes:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API returns appropriate HTTP status codes along with error messages:

- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication failure
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side errors

## Development

### Running in Development Mode

```
npm run dev
```

### Running Tests

```
npm test
```
