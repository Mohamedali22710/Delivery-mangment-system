
const mongoose = require("mongoose");

const DbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected with db: ${conn.connection.host}`);
    } catch (err) {
        console.error(`error connecting to db: ${err}`);
    }
};

module.exports = DbConnection;