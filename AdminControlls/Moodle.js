import MoodleDumb from '../Models/MoodleDumb.js'
import Files from '../Models/Files.js'
import mongoose from 'mongoose'

export async function addMoodleContent(classid, title, files, content, date) {
    return new Promise(async (resolve, reject) => {
        const Data = new MoodleDumb({
            _id: new mongoose.Types.ObjectId(),
            classid: classid,
            title: title,
            filesid: files,
            content: content,
            date: date
        })
        await Data.save().then(e => {
            resolve(1)
        })
            .catch(er => {
                console.log(er)
                reject(0)
            })
    })
}

export async function addFileInfo(name,data) {
    return new Promise(async (resolve, reject) => {
        const Data = new Files({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            data: data
        })
        await Data.save().then(e => {
            resolve(1)
        })
            .catch(er => {
                console.log(er)
                reject(0)
            })
    })
}