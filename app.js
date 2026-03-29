const express = require("express");
// conn with mongoose to conn with db
const path=require("path");
const app = express();
const cors=require("cors")
const driverRoutes = require("./src/Modules/driver/Routes/driverRout")
const AuthRout = require("./src/Modules/Auth/routes/authRoutes")
const Shipmentsroute=require("./src/Modules/Shipments/routes/Shipmentsroute")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/driver", driverRoutes);
app.use("/api/auth", AuthRout);
app.use("/", Shipmentsroute);

app.use("/Uploads",express.static(path.join(__dirname,'Uploads')))


module.exports = app;