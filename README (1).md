# 🚚 Delivery System API

A scalable RESTful backend system for managing drivers, shipments, and
real-time delivery tracking.

------------------------------------------------------------------------

## 📌 Overview

This project is a backend API for a Delivery Management System that
allows:

-   Managing drivers
-   Managing shipments
-   Assigning shipments to drivers
-   Tracking shipment status
-   Real-time shipment updates
-   Authentication & Authorization
-   Clean Architecture implementation

Built with:

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   Socket.io
-   JWT Authentication

------------------------------------------------------------------------

## 🚀 What does this project do?

- User registration, login, logout, and profile management (with validation and JWT authentication)
- Driver management (add, list, update, delete drivers; admin-only access)
- Shipments management (create, list, get by ID, update, partial update; admin-only for create/update)
- Role-based access control (admin/driver)
- Data validation for all main endpoints
- Centralized error handling
- Modular, scalable code structure (MVC, separated modules)
- Ready for API testing with a full Postman collection

# 🏗️ Architecture

The project follows:

-   MVC Pattern
-   Service Layer Pattern
-   Separation of Concerns
-   Centralized Error Handling
-   Modular Folder Structure

------------------------------------------------------------------------

# 📦 Core Modules

## 1️⃣ Drivers Module

### Fields

-   name
-   email
-   phone
-   vehicleType
-   isAvailable
-   role (admin / driver)
-   createdAt

### Endpoints

POST /api/drivers\
GET /api/drivers\
GET /api/drivers/:id\
PUT /api/drivers/:id\
DELETE /api/drivers/:id

------------------------------------------------------------------------

## 2️⃣ Shipments Module

### Fields

-   senderName
-   receiverName
-   pickupAddress
-   deliveryAddress
-   status
-   assignedDriver (ObjectId → Driver)
-   createdAt

### Status Values

-   pending
-   assigned
-   picked_up
-   in_transit
-   delivered
-   cancelled

### Endpoints

POST /api/shipments\
GET /api/shipments\
GET /api/shipments/:id\
PUT /api/shipments/:id\
DELETE /api/shipments/:id\
PUT /api/shipments/:id/assign/:driverId\
PUT /api/shipments/:id/status

------------------------------------------------------------------------

## 3️⃣ Authentication Module

### Endpoints

POST /api/auth/register\
POST /api/auth/login\
GET /api/auth/profile

### Features

-   Password hashing (bcrypt)
-   JWT token generation
-   Auth middleware
-   Protected routes

------------------------------------------------------------------------

# 🔄 Real-Time Updates

Using Socket.io.

Events: - shipmentAssigned - shipmentStatusUpdated

Triggered when: - A shipment is assigned to a driver - Shipment status
is updated

------------------------------------------------------------------------

# 📂 Project Structure

src/ │ ├── controllers/ ├── routes/ ├── services/ ├── middlewares/ ├──
models/ ├── utils/ ├── app.js └── server.js

------------------------------------------------------------------------

# 🗓️ 15-Day Development Plan

## Phase 1 --- Express Fundamentals (Days 1--3)

-   Basic Express server
-   CRUD (in-memory)
-   Middleware
-   Status codes
-   404 handler
-   Basic Socket.io integration

## Phase 2 --- Project Structure (Days 4--6)

-   MVC structure
-   Routes separation
-   Controllers
-   .env configuration
-   Custom middleware
-   Nodemon

## Phase 3 --- Database Integration (Days 7--9)

-   Connect MongoDB
-   Create Driver & Shipment models
-   Validation
-   Relationships
-   Populate
-   Full CRUD with DB
**note: whats  Glister = it is small machine deployed in cloud it mange my database**
**Mongoose**

## Phase 4 --- Authentication & Security (Days 10--11)

-   Register & Login
-   JWT authentication
-   Password hashing
-   Protect routes
-   CORS & Helmet

## Phase 5 --- Error Handling (Days 12--13)

-   Custom AppError class
-   Global error middleware
-   Async wrapper
-   Consistent error responses

## Phase 6 --- Clean Architecture Refactor (Days 14--15)

-   Service layer implementation
-   Thin controllers
-   Business rules enforcement
-   Code cleanup & optimization

------------------------------------------------------------------------

# 🔐 Security Practices

-   JWT expiration
-   bcrypt password hashing
-   Input validation
-   CORS configuration
-   Helmet security headers
-   Environment variables
-   No blocking synchronous operations

------------------------------------------------------------------------

# 📊 HTTP Status Codes Policy

-   200 → Success
-   201 → Created
-   204 → No Content
-   400 → Bad Request
-   401 → Unauthorized
-   403 → Forbidden
-   404 → Not Found
-   500 → Internal Server Error

------------------------------------------------------------------------

# ⚙️ Installation & Setup

## Install Dependencies

npm install

## Create .env File

PORT=3000\
MONGO_URI=your_mongodb_connection_string\
JWT_SECRET=your_secret_key

## Run Development Server

npm run dev

------------------------------------------------------------------------

# 👥 Team Development Rules

-   Use feature branches
-   Commit daily
-   No business logic inside routes
-   Always validate input
-   Always handle async errors
-   Use proper HTTP status codes
-   Keep controllers thin
-   Put business logic in services

------------------------------------------------------------------------

# 🎯 Final Goal

After 15 days, the project will:

-   Follow clean backend architecture
-   Have authentication & authorization
-   Support real-time shipment tracking
-   Be scalable & production-ready
-   Follow industry best practices
