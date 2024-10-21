import Classdumbs from "../Models/Classdumbs.js";
import Classes from "../Models/Classes.js";
import mongoose from "mongoose";


export async function createClass(title, teacherid) {
    return new Promise(async (resolve, reject) => {
        const cs = new Classes({
            _id: new mongoose.Types.ObjectId(),
            title: title,
            teacherid: teacherid,
        })
        await cs.save().then(e => {
            resolve(1)
        })
            .catch(er => {
                console.log(er)
                reject(0)
            })
    })
}



export async function addClassDumb(classid, userid) {
    return new Promise(async (resolve, reject) => {
        const cs = new Classdumbs({
            _id: new mongoose.Types.ObjectId(),
            classid: classid,
            userid: userid
        })
        await cs.save().then(e=>{
            resolve('ok')
        })
        .catch(er=>{
            console.log(er)
            reject('bummer')
        })
    })
}