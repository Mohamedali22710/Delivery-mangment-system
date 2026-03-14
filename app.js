const express = require("express");
// conn with mongoose to conn with db

const app = express();
const driverRoutes = require("./src/Modules/driver/Routes/driverRout")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/driver", driverRoutes);


module.exports = app;