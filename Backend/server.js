import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'

import authRoutes from "./Routes/auth.routes.js"
import messageRoutes from "./Routes/message.routes.js"
import userRoutes from "./Routes/user.routes.js"

import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./Socket/socket.js";


const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

app.use(express.json()) // to pasrse incoming requests with JSON payload(from request.body)
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.use(express.static(path.join(__dirname,"/Frontend/dist")))

app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"Frontend","dist","index.html"))
})


server.listen(PORT,() => {
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`);
});