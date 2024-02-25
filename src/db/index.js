import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const dbConnection = async () => {
    try {
        const connInstance = await mongoose.connect(`${process.env.MDB_URI}/${DB_NAME}`);
        console.log(`\n Connected to MongoDB!! DB Host: ${connInstance.connection.host}`);
    } catch (error) {
        console.error(`DB ${process.env.MDB_URI}`, error);
        // throw error;
        process.exit(1);
    }
};

export default dbConnection;