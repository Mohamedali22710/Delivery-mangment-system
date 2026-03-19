# 🚚 Delivery Management System

A scalable and production-ready **Delivery System API** built with **Node.js & Express**, designed to manage shipments, drivers, and tracking operations.

---

## 📌 Overview

This backend system helps manage delivery workflows including:

* Driver management
* Shipment creation
* Shipment assignment
* Status tracking
* Authentication & Authorization (JWT)

Built with **clean architecture** and **RESTful API design**.

---

## 🚀 Features

### 👤 Authentication System

* Register (Driver / Admin)
* Login with JWT
* Protected routes
* Role-Based Access Control (RBAC)

---

### 🚚 Drivers Module

* Create driver
* Update driver info
* Delete driver
* View all drivers
* Manage driver availability

---

### 📦 Shipments Module

* Create shipment
* Assign shipment to driver
* Update shipment status
* View shipments

---

### 📍 Tracking System

* Track shipment status
* View shipment history
* Ready for real-time updates (Socket.io)

---

## 🧠 Business Logic

### Assign Shipment

* Ensure shipment exists
* Ensure driver exists
* Ensure driver is available
* Assign shipment to driver
* Update shipment status → `assigned`
* Update driver availability → `false`

---

### Shipment Status Flow

```bash
pending → assigned → in-transit → delivered
```

---

## 🏗️ Project Structure

```bash
src/
│
├── modules/
│   ├── auth/
│   ├── driver/
│   ├── shipment/
│   └── tracking/
│
├── middlewares/
│   ├── auth.js
│   ├── allowedTo.js
│   └── errorHandler.js
│
├── utils/
│
├── app.js
└── server.js
```

---

## 🔐 Authorization (RBAC)

| Role   | Permissions                              |
| ------ | ---------------------------------------- |
| Admin  | Full access (drivers, shipments, assign) |
| Driver | View assigned shipments + update status  |

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt
* Socket.io (optional)

---

## 🔑 Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

---

## ▶️ Run Project

```bash
npm run dev
```

---

## 📡 API Endpoints

### Auth

```bash
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

---

### Drivers

```bash
GET    /api/drivers
POST   /api/drivers
PATCH  /api/drivers/:id
DELETE /api/drivers/:id
```

---

### Shipments

```bash
POST /api/shipments
GET  /api/shipments

PUT  /api/shipments/:id/assign/:driverId
PUT  /api/shipments/:id/status
```

---

## 🔥 Future Improvements

* Real-time tracking with Socket.io
* Notifications system
* Admin dashboard (React)
* Driver mobile app
* GPS tracking integration

---

## 👨‍💻 Author

Mohamed Ali
Backend Developer (Node.js)
