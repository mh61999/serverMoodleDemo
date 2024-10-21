import Express from "express";
import { addClassDumb, createClass } from "../AdminControlls/Class.js";
import { createUser } from "../AdminControlls/Users.js";
import { createTimeLines } from "../AdminControlls/Calendar.js";
import { addFileInfo, addMoodleContent } from "../AdminControlls/Moodle.js";
import { getMoodleContent } from "../Controlls/shared/Moode.js";
import { createFeed } from "../AdminControlls/Feed.js";
const Router = Express.Router()

//Class
Router.post('/createClass', async (req, res) => {
    const { title, teacherid } = req.body
    await createClass(title, teacherid).then(e => {
        console.log('classcreated')
        return res.status(200).json({
            response: 'created'
        })
    })
        .catch(er => {
            console.log('something went wrong')
            return res.status(500).json({
                response: 'faild'
            })
        })
})

//User
Router.post('/createUser', async (req, res) => {
    const { user, password, phone, email, firstname, lastname, authRank } = req.body
    await createUser(user, password, phone, email, firstname, lastname, authRank).then(e => {
        console.log('created')
        return res.status(200).json({
            response: 'created'
        })
    })
        .catch(er => {
            if (er == 2) {
                console.log('user already exists')
            }
            else {
                console.log('something went wrong')
            }
            return res.status(500).json({
                response: 'faild'
            })
        })
})

//Calendar

Router.post('/addClassDumb',async (req,res)=>{
    const {classid,userid} = req.body
    await addClassDumb(classid,userid).then(e=>{
        return res.status(200).json({
            message: e
        })
    })
    .catch(er=>{
        return res.status(500).json({
            message: er
        })
    })
})


Router.post('/addTimelines', async (req, res) => {
    const { arr } = req.body
    try {
        if (arr.length > 0) {
            for (let i in arr) {
                await createTimeLines(arr[i].classid, arr[i].DateB, arr[i].DateE)
                    .then(e => {
                        console.log('created')
                    })
                    .catch(er => {
                        return res.status(500).json({
                            response: 'failed'
                        })
                    })
            }
            return res.status(200).json({
                response: 'created'
            })
        }
        else {
            return res.status(500).json({
                response: 'failed'
            })
        }
    }
    catch {
        return res.status(500).json({
            response: 'failed'
        })
    }
})
//Moodle

Router.post('/addMoodleContent',async(req,res)=>{
    const {classid, title, files, content, date}= req.body
    await addMoodleContent(classid, title, files, content, date).then(e=>{
        return res.status(200).json({
            response: 'created'
        })
    })
    .catch(er=>{
        return res.status(500).json({
            response: 'failed'
        })
    })
})
Router.post('/addFileWork',async(req,res)=>{
    const {name,data}= req.body
    await addFileInfo(name,data).then(e=>{
        return res.status(200).json({
            response: 'created'
        })
    })
    .catch(er=>{
        return res.status(500).json({
            response: 'failed'
        })
    })
})



Router.post('/gettest',async(req,res)=>{
    await getMoodleContent(req.body.id).then(e=>{
        return res.status(200).json({
            response: e
        })
    })
    .catch(er=>{
        return res.status(200).json({
            response: 'no'
        })
    })
})

//Feed

Router.post('/createFeed',async(req,res)=>{
    await createFeed(req.body).then(e=>{
        return res.status(200).json({
            message: e
        })
    }).catch(er=>{
        return res.status(500).json({
            message: er
        })
    })
})
export default Router