import  Express  from "express";
import Messagedumbs from "../Models/Messagedumbs.js";
import mongoose from "mongoose";
import Feed from "../Models/Feed.js";
const Router = Express.Router()

Router.post('/messagetest',async(req,res)=>{
    const message = new Messagedumbs({
        _id: new mongoose.Types.ObjectId(),
        classid: req.body.classid,
        userid: req.body.userid,
        content: req.body.content
    })
    message.save().then(resi =>{
        return res.status(200).json({
            message: resi
        })
    })
    .catch(er=>{
        return res.status(500).json({
            message: er
        })
    })
})

Router.post('/feedtest',async(req,res)=>{
    const {title,content,sender} = req.body
    const feed = new Feed({
        _id: new mongoose.Types.ObjectId(),
        title: title,
        content: content,
        sender: sender,
    })
    feed.save().then(e=>{
        return res.status(200).json({
            message: e
        })
    })
    .catch(er =>{
        return res.status(500).json({
            message: er
        })
    })

})


export default Router