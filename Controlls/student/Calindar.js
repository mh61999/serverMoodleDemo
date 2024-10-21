import Classdumbs from "../../Models/Classdumbs.js"
import Classes from "../../Models/Classes.js"
import Timeline from "../../Models/Timeline.js"
import Users from "../../Models/Users.js"



export async function getCalindarS(id) {
    return new Promise(async (resolve, reject) => {
        await Classdumbs.find({ userid: id }).then(async classes => {
            const retrunArray = []
            if (classes.length > 0) {
                for (let i in classes) {
                    await Classes.findById(classes[i].classid).then(async Cinfo => {
                        await Users.findById(Cinfo.teacherid).then(async teacher => {
                            await Timeline.find({ classid: classes[i].classid }).sort({ DateB: 1 }).then(re => {
                                if (re.length > 0) {
                                    for (let j in re) {
                                        retrunArray.push({
                                            id: Cinfo._id,
                                            title: Cinfo.title,
                                            day: re[j].DateB.getDate(),
                                            month: re[j].DateB.getMonth(),
                                            year: re[j].DateB.getFullYear(),
                                            TimeBH: re[j].DateB.getHours(),
                                            TimeEH: re[j].DateE.getHours(),
                                            TimeBM: re[j].DateB.getMinutes(),
                                            TimeEM: re[j].DateE.getMinutes(),
                                            teacher: teacher.firstname + ' ' + teacher.lastname,
                                        })
                                    }
                                }
                            })
                        })
                            .catch(er => {
                                console.log(er)
                                reject(0)
                            })
                    })
                        .catch(er => {
                            console.log(er)
                            reject(0)
                        })
                }
            }
            resolve(retrunArray)
        })
            .catch(er => {
                console.log(er)
                reject(0)
            })

    })
}


export async function getCalindarSBymonth(id,month) {
    return new Promise(async (resolve, reject) => {
        await Classdumbs.find({ userid: id }).then(async classes => {
            const retrunArray = []
            if (classes.length > 0) {
                for (let i in classes) {
                    await Classes.findById(classes[i].classid).then(async Cinfo => {
                        await Users.findById(Cinfo.teacherid).then(async teacher => {
                            await Timeline.find({ classid: classes[i].classid }).sort({ DateB: 1 }).then(re => {
                                if (re.length > 0) {
                                    for (let j in re) {
                                        if(month == re[j].DateB.getMonth()){
                                        retrunArray.push({
                                            id: Cinfo._id,
                                            title: Cinfo.title,
                                            day: re[j].DateB.getDate(),
                                            month: re[j].DateB.getMonth(),
                                            year: re[j].DateB.getFullYear(),
                                            TimeBH: re[j].DateB.getHours(),
                                            TimeEH: re[j].DateE.getHours(),
                                            TimeBM: re[j].DateB.getMinutes(),
                                            TimeEM: re[j].DateE.getMinutes(),
                                            teacher: teacher.firstname + ' ' + teacher.lastname,
                                        })}
                                    }
                                }
                            })
                        })
                            .catch(er => {
                                console.log(er)
                                reject(0)
                            })
                    })
                        .catch(er => {
                            console.log(er)
                            reject(0)
                        })
                }
            }
            resolve(retrunArray)
        })
            .catch(er => {
                console.log(er)
                reject(0)
            })

    })
}