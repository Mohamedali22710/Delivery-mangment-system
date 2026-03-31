const app = require("./app");
const httpStat = require("./src/utils/httpStatustext")
const dotenv = require("dotenv");
const DbConnection = require("./config/Database");

// envaruioment variable connect
dotenv.config();

//connect with database
DbConnection();

//GLOBAL MIDDLEWARES FOR ROUTE NOT FOUND
app.all(/.*/, (req, res, next) => {
    res.send("not fount");
})


//GLOBAL MIDDLEWARES FOR logic
// app.use((error, req, res, next) => {
//     res.status(error.statusCode || 500).json({ status: error.Statustext || httpStat.error, massage: error.massage, code: error.statusCode || 500, data: null })
// })

app.use((error, req, res, next) => {
  console.error("Global error handler:", error); 
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStat.error, 
    message: error.message, 
    code: error.statusCode || 500,
    data: null
  });
});

const port = process.env.PORT || 4000;
console.log(process.env.PORT);
app.listen(port, () => {
    console.log(`server is running on ${port}`)
});






