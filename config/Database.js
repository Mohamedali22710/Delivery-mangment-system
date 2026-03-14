
const mongoose = require("mongoose");

const DbConnection=()=>{

    mongoose.connect(process.env.MONGO_URI).then((conn) => {
    console.log(`connected with db  ${conn.connection.host} `);


}).catch((err) => {
    console.log(`error of conn db ${err} `);
})
}

module.exports=DbConnection;
