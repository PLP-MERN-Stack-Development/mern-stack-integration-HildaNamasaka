# MERN Stack Blog Application

A full-stack blog application built with MongoDB, Express.js, React.js, and Node.js demonstrating seamless integration between front-end and back-end components.

## Project Overview

This blog platform allows users to create, read, update, and delete blog posts with a modern, responsive interface. The application features user authentication, category management, commenting system, and search functionality.

### Technology Stack

**Frontend:**
- React 19.1.1
- React Router DOM 6.20.0
- Axios 1.6.2
- Tailwind CSS 4.1.16
- Vite 7.1.7

**Backend:**
- Node.js & Express.js 4.18.2
- MongoDB with Mongoose 8.0.0
- JWT Authentication
- Bcrypt.js

## Features Implemented

### Core Features
- User registration and authentication with JWT
- Complete CRUD operations for blog posts
- Category system with filtering
- Comments on posts
- Search functionality
- Pagination
- Protected routes for authenticated users
- Role-based authorization (user/admin)

### Additional Features
- Auto-generated slugs from post titles
- Post view count tracking
- Featured images support
- Post tags
- Draft and published status
- Author profile display
- Responsive design

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
npm install
```

2. Create `.env` file:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-blog?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
```

3. Start server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
npm install
```

2. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm run dev
```

Application runs on `http://localhost:5173`

### MongoDB Atlas Configuration

1. Create cluster at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Network Access: Add IP (0.0.0.0/0 for development)
3. Database Access: Create user with read/write permissions
4. Get connection string from Connect > Connect your application

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

**Register User**
```
POST /api/auth/register
Body: { name, email, password }
```

**Login User**
```
POST /api/auth/login
Body: { email, password }
```

**Get Current User**
```
GET /api/auth/me
Headers: { Authorization: Bearer <token> }
```

### Posts

**Get All Posts**
```
GET /api/posts?page=1&limit=10&category=<id>
```

**Get Single Post**
```
GET /api/posts/:id
```

**Create Post** (Protected)
```
POST /api/posts
Headers: { Authorization: Bearer <token> }
Body: { title, content, excerpt, category, tags, featuredImage, isPublished }
```

**Update Post** (Protected)
```
PUT /api/posts/:id
Headers: { Authorization: Bearer <token> }
Body: { title, content, ... }
```

**Delete Post** (Protected)
```
DELETE /api/posts/:id
Headers: { Authorization: Bearer <token> }
```

**Add Comment** (Protected)
```
POST /api/posts/:id/comments
Headers: { Authorization: Bearer <token> }
Body: { content }
```

**Search Posts**
```
GET /api/posts/search?q=<query>
```

### Categories

**Get All Categories**
```
GET /api/categories
```

**Create Category** (Admin Only)
```
POST /api/categories
Headers: { Authorization: Bearer <token> }
Body: { name, description, color }
```

## Database Models

### User
- name, email, password (hashed), role (user/admin), avatar, bio
- Timestamps: createdAt, updatedAt

### Post
- title, content, slug (unique), excerpt, featuredImage
- author (ref: User), category (ref: Category)
- tags (array), isPublished, viewCount
- comments (array with user, content, createdAt)
- Timestamps: createdAt, updatedAt

### Category
- name (unique), slug (unique), description, color
- Timestamps: createdAt, updatedAt

## Screenshots

  ### Home Page
  ![Home Page](screenshots/home.png)
   
      
   ### Create Post Page
   ![Create Post](screenshots/create-post.png)
   
   ### Login Page
   ![Login](screenshots/login.png)
## Project Structure

```
mern-blog/
├── client/
│   ├── src/
│   │   ├── components/     (Navbar, PostCard, PostForm, Loading, Error, Pagination)
│   │   ├── pages/          (Home, Posts, PostDetail, CreatePost, EditPost, Login, Register)
│   │   ├── hooks/          (usePosts, useCategories)
│   │   ├── services/       (api.js)
│   │   ├── context/        (AuthContext.jsx)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/
│   ├── controllers/        (authController, postController, categoryController)
│   ├── models/             (User, Post, Category)
│   ├── routes/             (auth, posts, categories)
│   ├── middleware/         (auth)
│   ├── server.js
│   └── package.json
└── README.md
```

## Usage

1. Register an account at `/register`
2. Login at `/login`
3. Browse posts on home page
4. Filter by category or search
5. Create posts via "Create Post" button (requires login)
6. View post details by clicking on any post
7. Edit/delete your own posts from post detail page
8. Add comments on any post (requires login)




# MERN Stack Integration Assignment

This assignment focuses on building a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that demonstrates seamless integration between front-end and back-end components.

## Assignment Overview

You will build a blog application with the following features:
1. RESTful API with Express.js and MongoDB
2. React front-end with component architecture
3. Full CRUD functionality for blog posts
4. User authentication and authorization
5. Advanced features like image uploads and comments

## Project Structure

```
mern-blog/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Express.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week4-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week4-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Configuration files
  - Sample models and components

## Requirements

- Node.js (v18 or higher)
- MongoDB (local installation or Atlas account)
- npm or yarn
- Git

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement all required API endpoints
3. Create the necessary React components and hooks
4. Document your API and setup process in the README.md
5. Include screenshots of your working application

## Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Mongoose Documentation](https://mongoosejs.com/docs/) 