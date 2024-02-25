import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS configuration for the frontend to access the backend server from a different origin (port) 
app.use(cors({
    origin: process.env.CORS_URL,
    credentials: true
}));

// express.json() is for parsing application/json data sent in the request body 
app.use(express.json({
    limit: "2mb"
}));

// express.urlencoded() is for parsing application/x-www-form-urlencoded data sent in the request body 
app.use(express.urlencoded({
    extended: true,
    limit: "2mb"
}));

// express.static() is for serving static files such as images, CSS files, and JavaScript files in a directory 
app.use(express.static("public"));

// cookieParser() is for parsing cookies sent in the request headers 
app.use(cookieParser());


export { app }