import Classes from "../../Models/Classes.js";
import Timeline from "../../Models/Timeline.js";
import User from '../../Models/Users.js'
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export async function getCalindarT(id) {
    return new Promise(async (resolve, reject) => {
        await Classes.find({ teacherid: id }).then(async e => {
            await User.findById(id).then(async t => {
                if (e.length > 0) {
                    let arr = []
                    for (let i in e) {
                        await Timeline.find({ classid: e[i]._id }).sort({ DateB: 1 }).then(re => {
                            if (re.length > 0) {
                                for (let j in re) {
                                    arr.push({
                                        id: e[i]._id,
                                        title: e[i].title,
                                        day: re[j].DateB.getDate(),
                                        month: re[j].DateB.getMonth(),
                                        year: re[j].DateB.getFullYear(),
                                        TimeBH: re[j].DateB.getHours(),
                                        TimeEH: re[j].DateE.getHours(),
                                        TimeBM: re[j].DateB.getMinutes(),
                                        TimeEM: re[j].DateE.getMinutes(),
                                        teacher: t.firstname+' '+t.lastname,
                                    })
                                }
                            }
                        })
                            .catch(er => {
                                console.log(er)
                                reject(0)
                            })
                    }
                    resolve(arr)
                }
                else {
                    resolve([])
                }
            })
            .catch(er=>{
                console.log(er)
            reject(0)
            })
        }).catch(er => {
            console.log(er)
            reject(0)
        })
    })
}

export async function getCalindarTByMonth(id,month) {
    return new Promise(async (resolve, reject) => {
        await Classes.find({ teacherid: id }).then(async e => {
            await User.findById(id).then(async t => {
                if (e.length > 0) {
                    let arr = []
                    for (let i in e) {
                        await Timeline.find({ classid: e[i]._id }).select({_id:0}).sort({ DateE: 1 }).then(re => {
                            if (re.length > 0) {
                                for (let j in re) {
                                    if(month == re[j].DateB.getMonth()){
                                    arr.push({
                                        title: e[i].title,
                                        day: re[j].DateB.getDate(),
                                        month: re[j].DateB.getMonth(),
                                        year: re[j].DateB.getFullYear(),
                                        TimeBH: re[j].DateB.getHours(),
                                        TimeEH: re[j].DateE.getHours(),
                                        TimeBM: re[j].DateB.getMinutes(),
                                        TimeEM: re[j].DateE.getMinutes(),
                                        teacher: t.firstname+' '+t.lastname,
                                    })
                                }
                                }
                            }
                        })
                            .catch(er => {
                                console.log(er)
                                reject(0)
                            })
                    }
                    resolve(arr)
                }
                else {
                    resolve([])
                }
            })
            .catch(er=>{
                console.log(er)
            reject(0)
            })
        }).catch(er => {
            console.log(er)
            reject(0)
        })
    })
}
