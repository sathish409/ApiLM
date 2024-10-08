import express from 'express';
import cors from 'cors';
import morgan from 'morgan'


import "dotenv/config";

const app= express();
 const PORT= process.env.PORT || 8000;

 //db config

import {connectDb} from './src/config/dbConfig.js'
connectDb()

 //middlewares

 app.use(cors());
 app.use(express.json());
 app.use(morgan("dev"));

 //api endpoints

 import userRouter from './src/routers/userRouter.js'
 import bookRouter from './src/routers/bookRouter.js'
 import burrowRouter from './src/routers/burrowRouter.js'
import { userAuth } from './src/middlewares/authMiddleware.js';
 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/books", bookRouter)
app.use("/api/v1/burrow", userAuth, burrowRouter)

 app.get("/", (req, res)=>{
    res.json({
        status:"success",
        message:"server is running healthy",
    })
 })

 app.use("*", (req, res, next)=>{
  const error = {
    message:"404 page not found",
    errorCode:404,
  };
  next(error)
 });

 app.use((error, req, res, next)=>{
    console.log(error)
    const errorCode=error.errorCode || 500;
    res.status(errorCode).json({
        status:'error',
        message:error.message,
    })
 })

 app.listen(PORT, error=>{
    error ?
    console.log(error.message)
    :console.log(`server is running at http://localhost:${PORT}`)
 })

