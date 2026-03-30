const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const mongoose = require('mongoose');

// Middlewares
app.use(cors());
app.use(express.json());

// Create server & socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
});

// Make io accessible in routes/controllers
app.set('io', io);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
// Routes
const shipmentRoutes = require('./src/Modules/Shipments/Routes/Shipmentsroute');
const driverRoutes = require('./src/Modules/driver/Routes/driverRout');

app.use('/api/shipments', shipmentRoutes);
app.use('/api/drivers', driverRoutes);

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.io connection
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);
});