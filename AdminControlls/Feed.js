import mongoose from "mongoose"
import Feed from "../Models/Feed.js"


export async function createFeed(data){
    return new Promise(async(resolve,reject)=>{
        const feed = new Feed({
            _id: new mongoose.Types.ObjectId,
            title: data.title,
            content: data.content,
            sender: data.sender
        })
        await feed.save().then(e=>{
            resolve(e)
        })
        .catch(er=>{
            reject(er)
        })
    })
}