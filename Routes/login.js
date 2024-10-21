
import  Express  from "express";
import  Jwt  from "jsonwebtoken";

const Router = Express.Router();

import crypt from 'bcrypt'


import Users from "../Models/Users.js";



Router.post('/', async(req,res)=>{
    const {user,password} = req.body;
    console.log(user)
    Users.find({user: user})
    .then(async result =>{
        if(result.length > 0){
            console.log(result)
            if(await verifypass(password,result[0].password)){
                const token = await generateAccessToken(result[0].id)
                res.cookie("token", token)
                return res.status(200).json({
                    status: 1,
                    rank: result[0].authRank,
                    auth:token
                })
            }
            else{
                return res.status(200).json({
                    status: 0
                })
            }
        }
        else{
            return res.status(200).json({
                status: 0
            })
        }
    })
    .catch(err =>{
        return res.status(401).json({
            message: 'something went wrong'
        })
    })
})


const verifypass = async(password,hash) =>{
    const results = await crypt.compare(password,hash)
    return results
}

const generateAccessToken = async(id) =>{
    return Jwt.sign({userid: id},process.env.ACCESS_TOKEN, {expiresIn: "50m"})
}


export default Router