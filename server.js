require('dotenv').config();

const app = require("./app");


const DbConnection = require("./config/Database");


DbConnection();

app.all(/.*/,(req,res,next)=>{
    res.send("not fount");
})

const port = process.env.PORT || 4000;
console.log(process.env.PORT);
app.listen(port, () => {
    console.log(`server is running on ${port}`)
});






