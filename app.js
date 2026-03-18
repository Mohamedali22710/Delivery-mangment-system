
const express = require("express");
const app = express();


const driverRoutes = require("./src/Modules/driver/Routes/driverRout")
const shipmentRoutes=require("./src/Modules/driver/Routes/shipmentRoutes")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/driver", driverRoutes);
app.use("/shipment",shipmentRoutes)

module.exports = app;