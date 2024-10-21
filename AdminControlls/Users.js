import Users from "../Models/Users.js";
import mongoose from "mongoose";
import crypt from 'bcrypt'
import  Jwt from "jsonwebtoken";
export async function createUser(user,password,phone,email,firstname,lastname,authRank) {
    return new Promise(async (resolve, reject) => {
        await Users.find({user:user}).then(async e=>{
            if(e.length>0){
                reject(2)
            }
            else{
                const use = new Users({
                    _id: new mongoose.Types.ObjectId(),
                    user: user,
                    password: await hashpass(password),
                    phone:phone,
                    email:email,
                    firstname:firstname,
                    lastname:lastname,
                    authRank:authRank
                })
                use.save()
                .then(e=>{
                    resolve(1)
                })
                .catch(er=>{
                    console.log(er)
                    reject(0)
                })
            }
        })
        .catch(er=>{
            console.log(er)
            reject(0)
        })
    })
}

const hashpass = async(password) =>{
    const hash = await crypt.hash(password,10);
    return hash
}

const generateAccessToken = async(id) =>{
    return Jwt.sign({userid: id},process.env.ACCESS_TOKEN, {expiresIn: "50m"})
}
