import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'

import authRoutes from "./Routes/auth.routes.js"
import messageRoutes from "./Routes/message.routes.js"
import userRoutes from "./Routes/user.routes.js"

import connectToMongoDb from "./db/connectToMongoDb.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()) // to pasrse incoming requests with JSON payload(from request.body)
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

// app.get("/",(req,res) =>{
//     // root route http://localhost:5000/
//     res.send("Hello world !")
// })


app.listen(PORT,() => {
    connectToMongoDb();
    console.log(`Server running on port ${PORT}`);
});