import Feed from "../../Models/Feed.js";



export async function GetFeed(){
    return new Promise(async (resolve,reject)=>{
        await Feed.find().select({_id: 0}).then(result=>{
            resolve(
                result
            )
        })
    })
}