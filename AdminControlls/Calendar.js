import mongoose from "mongoose";
import Timeline from "../Models/Timeline.js";
import Classes from "../Models/Classes.js";

export async function createTimeLines(classid,DateB,DateE){
        return new Promise(async(resolve,reject) =>{
            await Classes.find({_id:classid}).then(async e=>{
                if(e.length>0){
                    const time = new Timeline({
                        _id: new mongoose.Types.ObjectId(),
                        classid:classid,
                        DateB:DateB,
                        DateE:DateE
                    })
                    time.save().then(re=>{
                        resolve(1)
                    })
                    .catch(er=>{
                        console.log(er)
                        reject(0)
                    })
                }
                else{
                    reject(2)
                }
            })
            .catch(er=>{
                console.log(er)
                reject(0)
            })
        })
}