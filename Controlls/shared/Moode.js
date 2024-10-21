import Files from "../../Models/Files.js"
import MoodleDumb from "../../Models/MoodleDumb.js"

export async function getMoodleContent(id) {
    return new Promise(async (resolve, reject) => {
        await MoodleDumb.find({classid: id}).then(async e=>{
            let object = []
            if(e.length>0){
                for(let i in e){
                    let fileload = []
                    if(e[i].filesid.length>0){
                        for(let j in e[i].filesid){
                            await Files.findById(e[i].filesid[j]).then(e=>{
                                fileload.push({title: e.name,id: e.data})
                            })
                            .catch(er=>{
                                console.log(er)
                            })
                        }
                    }
                    object.push({
                        id: e[i]._id,
                        title: e[i].title,
                        notes: e[i].content,
                        files: fileload,
                        date: e[i].date
                    })
                }
                resolve(object)
            }
            else{
                resolve(object)
            }
        })
        .catch(er=>{
            console.log(er)
            reject(0)
        })
    })


}