//Configs
import  Express  from "express";

import mongoose from 'mongoose';

import dotenv from 'dotenv';


import cors from 'cors';

import cookieParser from "cookie-parser";
//---------------
//Routes
import Admin from './Routes/admin.js'

import Requests from './Routes/requests.js'

import Login from './Routes/login.js'
//------------
dotenv.config()


const app = Express()
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000','http://192.168.1.232:3000'],
    credentials: true
}))
app.use(Express.json());
app.use('/login',Login)
app.use('/admin',Admin);
app.use('/',Requests)
mongoose.connect(process.env.MONGO_URL)
.then(results => {
    app.listen(5000, () => {
        console.log(`Server is running on port ${5000}`);
    })
})