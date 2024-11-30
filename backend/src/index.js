// const express = require("express");
import express from "express" // type=module
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import messageRoutes from "./routes/message.route.js"

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app= express();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, ()=>{
    console.log("server is running on port:" + PORT);
    connectDB();
}); 