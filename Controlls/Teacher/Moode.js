import Classes from "../../Models/Classes.js";
import MoodleDumb from "../../Models/MoodleDumb.js";
import Files from "../../Models/Files.js";
import mongoose from "mongoose";
import fs from 'fs'
import User from '../../Models/Users.js'
import { getCalindarTByMonth } from "./Calendar.js";
export async function getClassesForMoodleT(id, month) {
    return new Promise(async (resolve, reject) => {
        await Classes.find({ teacherid: id }).then(async e => {
            await getCalindarTByMonth(id, month).then(async k => {
                let array = []
                for (let i in e) {
                    await User.findById(e[i].teacherid).then(t => {
                        array.push({
                            _id: e[i]._id,
                            title: e[i].title,
                            teacher: t.firstname + ' ' + t.lastname
                        })
                    })
                }
                resolve({ calindar: k, Moodle: array })
            })
        })
            .catch(er => {
                console.log(er)
                reject(0)
            })
    })


}

export async function submitNewMoodleData(data) {
    return new Promise(async (resolve, reject) => {
        const { classid, title, notes, date, Nfiles, fileName } = data
        const fileArray = []
        const filesReturn = []
        if (Nfiles.length > 1) {
            for (let i in Nfiles) {
                const file = new Files({
                    _id: new mongoose.Types.ObjectId,
                    name: fileName[i],
                    data: Nfiles[i].filename
                })
                await file.save().then(e => {
                    fileArray.push(e._id)
                    filesReturn.push({
                        id: e.data,
                        title: e.name
                    })
                })
                    .catch(er => {
                        console.log(er)
                        reject(0)
                    })
            }
        }
        else {
            for (let i in Nfiles) {
                const file = new Files({
                    _id: new mongoose.Types.ObjectId,
                    name: fileName,
                    data: Nfiles[i].filename
                })
                await file.save().then(e => {
                    fileArray.push(e._id)
                    filesReturn.push({
                        id: e.data,
                        title: e.name
                    })
                })
                    .catch(er => {
                        console.log(er)
                        reject(0)
                    })
            }
        }
        const dumb = new MoodleDumb({
            _id: new mongoose.Types.ObjectId,
            classid: classid,
            title: title,
            filesid: fileArray,
            content: notes,
            date: date
        })
        await dumb.save().then(e => {
            resolve({
                id: e._id,
                title: e.title,
                files: filesReturn,
                notes: e.content,
                date: e.date
            })
        })
            .catch(er => {
                console.log(er)
                reject(0)
            })
    })
}


export async function removeDumb(id) {
    return new Promise(async (resolve, reject) => {
        await MoodleDumb.findById(id).then(async e => {
            for (let i in e.filesid) {
                await Files.findById(e.filesid[i]).then(async f => {
                    if (f) {
                        fs.unlink('uploads/' + f.data, (err => {
                            if (err) console.log(err)
                            else {
                                console.log('del')
                            }
                        }))
                    }
                    await Files.deleteOne({ _id: e.filesid[i] })
                })
            }
            await MoodleDumb.deleteOne({ _id: id }).then(e => {
                resolve(1)
            })
                .catch(er => {
                    console.log(er)
                    reject(0)
                })
        })
    })
}



export async function UpdateMoodDumb(data) {
    return new Promise(async (resolve, reject) => {
        await MoodleDumb.findById(data.id).then(async e => {
            if (e) {
                let newArray = e.filesid
                const { title, notes, Nfiles, filestoremove, fileName } = data
                e.title = title
                e.content = notes
                if (filestoremove) {
                    if (typeof (filestoremove) == 'string') {
                        await Files.findOne({ data: filestoremove }).then(async f => {
                            if (f) {
                                newArray = newArray.filter(item => item != f._id)
                                fs.unlink('uploads/' + f.data, (err => {
                                    if (err) console.log(err)
                                    else {
                                        console.log('del')
                                    }
                                }))
                            }
                            await Files.deleteOne({ _id: f._id })
                        })
                            .catch(er => {
                                console.log(er)
                            })
                    }
                }
                const filenamearr = []
                if (Nfiles.length > 0) {
                    if (typeof (fileName) == 'string') {
                        filenamearr.push(fileName)
                    }
                    else if (typeof (fileName) == 'object') {
                        filenamearr.push(...fileName)
                    }
                    for (let i in Nfiles) {
                        const file = new Files({
                            _id: new mongoose.Types.ObjectId,
                            name: filenamearr[i],
                            data: Nfiles[i].filename
                        })
                        await file.save().then(e => {
                            newArray.push(e._id)
                        })
                            .catch(er => {
                                console.log(er)
                                reject(0)
                            })
                    }
                }
                e.filesid = newArray
                e.save().then(async n => {
                    let newfileArray = []
                    for (let i in n.filesid) {
                        await Files.findById(n.filesid[i]).then(f => {
                            newfileArray.push({
                                id: f.data,
                                title: f.name
                            })
                        })
                    }
                    resolve({
                        id: n._id,
                        title: n.title,
                        files: newfileArray,
                        notes: n.content,
                        date: n.date
                    })
                })
                    .catch(er => {
                        console.log(er)
                        reject(0)
                    })
            }
            else {
                reject(0)
            }
        })
            .catch(er => {
                console.log(er)
                reject(0)
            })

    })
}