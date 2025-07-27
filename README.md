# Smart Note App - Node.js Junior Developer Assessment

A comprehensive Note Management System built with Node.js, Express, and MongoDB, featuring user authentication and AI-powered note summarization.

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

### AI Integration

- **Note Summarization** - AI-powered note summarization using OpenAI API
- **Smart Summaries** - Generate concise 2-3 sentence summaries

### Security & Performance

- **Input Validation** - Comprehensive validation using Joi
- **Rate Limiting** - Protect against abuse with express-rate-limit
- **Security Headers** - Helmet.js for security headers
- **CORS Support** - Cross-origin resource sharing enabled
- **Error Handling** - Comprehensive error handling middleware
- **Clean Architecture** - Modular project structure

## Technology Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with asymmetric RS256 signing
- **Validation**: Joi for input validation
- **File Upload**: Multer for profile picture uploads
- **Email Service**: Nodemailer for OTP emails
- **AI Service**: OpenAI API for note summarization
- **Security**: Helmet, CORS, Rate Limiting
- **Environment**: dotenv for configuration

## Project Structure

```
smart-note-app/
├── controllers/           # Business logic controllers
│   ├── authController.js  # Authentication logic
│   └── noteController.js  # Notes management logic
├── middleware/           # Express middleware
│   ├── auth.js          # JWT authentication middleware
│   ├── errorHandler.js  # Global error handling
│   ├── upload.js        # File upload middleware
│   └── validation.js    # Input validation middleware
├── models/              # Database models
│   ├── User.js         # User schema and methods
│   └── Note.js         # Note schema and methods
├── routes/             # API route definitions
│   ├── auth.js        # Authentication routes
│   └── notes.js       # Notes routes
├── utils/             # Utility functions
│   ├── jwt.js        # JWT token utilities
│   ├── email.js      # Email sending utilities
│   └── validation.js # Joi validation schemas
├── uploads/          # Uploaded files directory
├── .env             # Environment variables
├── index.js         # Main application entry point
└── package.json     # Project dependencies
```

## Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v4.4 or higher)
- OpenAI API key (for note summarization)
- Email service credentials (for password reset)

## Security Features

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

## Performance Optimizations

### Database

- **Indexing**: Optimized database indexes for query performance
- **Pagination**: Database-level pagination to handle large datasets
- **Population**: Efficient data population for related documents

### API Design

- **GraphQL-like Filtering**: Flexible query parameters for efficient data retrieval
- **Response Optimization**: Structured responses with consistent format
- **Error Handling**: Efficient error processing and logging

## Development Guidelines

### Code Quality

- **ES6 Modules**: Modern JavaScript module system
- **JSDoc Comments**: Comprehensive function documentation
- **Clean Architecture**: Separation of concerns with modular structure
- **Error Handling**: Comprehensive error handling throughout the application

### Best Practices

- **Environment Configuration**: Secure environment variable management
- **Logging**: Descriptive logging for debugging and monitoring
- **Validation**: Input validation at multiple layers
- **Security**: Security-first approach in all implementations

## Testing

### Manual Testing

Test the API endpoints using tools like Postman or curl:

1. **Health Check**

   ```bash
   curl -X GET http://localhost:3000/health
   ```

2. **User Registration**

   ```bash
   curl -X POST http://localhost:3000/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "123456"}'
   ```

3. **User Login**
   ```bash
   curl -X POST http://localhost:3000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "123456"}'
   ```

## Deployment

### Environment Setup

1. Set up production MongoDB instance
2. Configure environment variables for production
3. Set up email service (Gmail, SendGrid, etc.)
4. Obtain OpenAI API key
5. Generate production RSA key pair

### Production Considerations

- Use process managers like PM2
- Set up reverse proxy with Nginx
- Configure SSL certificates
- Set up monitoring and logging
- Configure backup strategies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please contact the development team or create an issue in the repository.
