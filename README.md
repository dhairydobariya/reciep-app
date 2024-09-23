const documentation = `
# Recipe Management API Documentation

## Introduction

This API allows you to manage recipes, user authentication, and much more. The API includes functionality such as user registration, login, and recipe management. Swagger UI is used for generating API documentation and testing.


##
this app live in render 
link = https://reciep-app-ceoj.onrender.com


## Technologies Used
- **Express.js**: Backend framework.
- **MongoDB**: Database for storing users and recipes.
- **JWT**: For user authentication and session management.
- **Swagger**: API documentation. (https://reciep-app-ceoj.onrender.com/api-docs/#/)

## Prerequisites

Before using the API, make sure you have the following installed:
1. Node.js
2. MongoDB

## Setup

1. Clone the repository:
   \`\`\`bash
   git clone <repository-url>
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Create a `.env` file with the following variables:
   \`\`\`bash
   JWT_SECRET=<your_jwt_secret>
   \`\`\`

4. Start the server:
   \`\`\`bash
   npm start
   \`\`\`

## Endpoints

### Authentication Endpoints

| Method | Route        | Description                  |
|--------|--------------|------------------------------|
| POST   | /register     | Register a new user          |
| POST   | /login        | Log in as an existing user   |
| GET    | /logout       | Log out the current user     |

#### POST /register
Registers a new user by accepting their \`name\`, \`email\`, and \`password\`.

**Request Body**:
\`\`\`json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
\`\`\`

**Response**:
\`\`\`json
{
  "message": "User successfully registered"
}
\`\`\`

#### POST /login
Logs in an existing user and returns a JWT token.

**Request Body**:
\`\`\`json
{
  "name": "John Doe",
  "password": "password123"
}
\`\`\`

**Response**:
\`\`\`json
{
  "message": "User successfully logged in",
  "token": "<JWT_TOKEN>"
}
\`\`\`

#### GET /logout
Logs out the current user by clearing the JWT token cookie.

**Response**:
\`\`\`json
{
  "message": "User successfully logged out"
}
\`\`\`

### Recipe Endpoints

| Method | Route           | Description                      |
|--------|-----------------|----------------------------------|
| GET    | /recipes         | Fetch all recipes                |
| POST   | /recipes         | Create a new recipe              |
| PUT    | /recipes/:id     | Update an existing recipe        |
| DELETE | /recipes/:id     | Delete a recipe                  |

#### GET /recipes
Fetches all recipes in the database.

**Response**:
\`\`\`json
[
  {
    "_id": "614c1b58f1e7f200176f0b4f",
    "name": "Spaghetti Bolognese",
    "ingredients": ["pasta", "tomato sauce"],
    "instructions": "Boil pasta, add sauce."
  }
]
\`\`\`

#### POST /recipes
Creates a new recipe.

**Request Body**:
\`\`\`json
{
  "name": "Spaghetti Bolognese",
  "ingredients": ["pasta", "tomato sauce"],
  "instructions": "Boil pasta, add sauce."
}
\`\`\`

**Response**:
\`\`\`json
{
  "message": "Recipe successfully created"
}
\`\`\`

#### PUT /recipes/:id
Updates an existing recipe by ID.

**Request Body**:
\`\`\`json
{
  "name": "New Recipe Name",
  "ingredients": ["new", "ingredients"],
  "instructions": "Updated instructions"
}
\`\`\`

**Response**:
\`\`\`json
{
  "message": "Recipe successfully updated"
}
\`\`\`

#### DELETE /recipes/:id
Deletes a recipe by ID.

**Response**:
\`\`\`json
{
  "message": "Recipe successfully deleted"
}
\`\`\`

## Swagger Integration

This API uses Swagger for API documentation. Once the server is running, you can access the Swagger UI at:

\`\`\`
http://localhost:4000/api-docs
\`\`\`

Swagger configuration can be found in the \`index.js\` file with the following settings:

\`\`\`javascript
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Recipe Management API',
            version: '1.0.0',
            description: 'API documentation for the Recipe Management Application',
        },
        servers: [
            {
                url: 'http://localhost:4000', // Replace with your server URL
            },
        ],
    },
    apis: ['./route/*.js'],
};
\`\`\`

`;

console.log(documentation);
