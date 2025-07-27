# Smart Note App

A  Note Management System built with Node.js, Express, and MongoDB, featuring user authentication.

## Features

### User Authentication

- **User Registration** - Create new user accounts with email and password
- **User Login** - Authenticate users and return JWT tokens
- **Profile Picture Upload** - Upload and manage user profile pictures
- **Logout** - Revoke JWT tokens for secure logout
- **Password Reset** - Forget password with OTP email verification
- **Token Management** - Asymmetric JWT signing with RS256 algorithm

### Notes Management

- **Create Notes** - Add new notes with title and content
- **View Notes** - Retrieve notes with GraphQL-like filtering and pagination
- **Delete Notes** - Remove notes (only by owner)
- **Advanced Filtering** - Filter by user ID, title, date range
- **Pagination** - Database-level pagination for performance

### Security & Performance

- **Input Validation** - Comprehensive validation using Joi
- **Rate Limiting** - Protect against abuse with express-rate-limit
- **Security Headers** - Helmet.js for security headers
- **CORS Support** - Cross-origin resource sharing enabled
- **Error Handling** - Comprehensive error handling middleware
- **Clean Architecture** - Modular project structure

### Authentication & Authorization

- **JWT Tokens**: Asymmetric RS256 signing for enhanced security
- **Token Revocation**: Logout functionality revokes tokens
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Authentication Middleware**: Protects private routes

### Input Validation

- **Joi Validation**: Comprehensive input validation for all endpoints
- **File Upload Validation**: Image type and size restrictions
- **Email Validation**: Proper email format validation
- **Password Requirements**: Minimum length requirements

### Security Middleware
- **Helmet**: Security headers for protection against common vulnerabilities
- **CORS**: Configurable cross-origin resource sharing
- **Rate Limiting**: Protection against brute force attacks
- **Error Handling**: Secure error responses without sensitive information

## License
This project is licensed under the ISC License.
