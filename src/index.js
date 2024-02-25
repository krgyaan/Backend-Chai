// require("dotenv").config();
import dotenv from "dotenv";
import dbConnection from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
    path: "./env"
});

dbConnection().then(() => {
    app.on('error', (error) => {
        console.error("Error connecting to MongoDB: ", error);
        throw error;
    });

    app.listen(`${process.env.PORT}`, () => {
        console.log(`Server is running on port http://localhost:${process.env.PORT}`);
    });
}).catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
    throw error;
});



/*
// Approach 1:
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
const app = express();
(async () => {
    try {
        await mongoose.connect(`${process.env.MDB_URI}/${DB_NAME}`);
        console.log("Connected to MongoDB");
        app.on('error', (error) => {
            console.error("Error connecting to MongoDB: ", error);
            throw error;
        });

        app.listen(`${process.env.PORT}`, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        throw error;
    }
})();
*/
