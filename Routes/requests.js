import Express from "express";
const Router = Express.Router()
import env from 'dotenv'
import { cookieJwtAuth } from '../Controlls/verifiy.js'
import { getCalindarT } from "../Controlls/Teacher/Calendar.js";
import { UpdateMoodDumb, getClassesForMoodleT, removeDumb, submitNewMoodleData } from "../Controlls/Teacher/Moode.js";
env.config()
//testCon
Router.get('/', cookieJwtAuth, async (req, res) => {
    return res.status(200).json({
        status: 1,
        rank: req.auth,
    })
})
//Dash

Router.post('/Dash', cookieJwtAuth, async (req, res) => {
    console.log('req')
    return res.status(200).json({
        message: 's'
    })
})



//Calendar

Router.get('/Calendar', cookieJwtAuth, async (req, res) => {
    if (req.auth == 3) {
        await getCalindarS(req.id).then(e => {
            return res.status(200).json({
                status: 1,
                array: e
            })
        })
            .catch(er => {
                return res.status(500).json({
                    message: 'something went wrong api'
                })
            })
    }
    else if (req.auth == 2) {
        await getCalindarT(req.id).then(e => {
            return res.status(200).json({
                status: 1,
                array: e
            })
        })
            .catch(er => {
                return res.status(500).json({
                    message: 'something went wrong api'
                })
            })
    }
})

//Mooodle
import multer from "multer";
const upload = multer({ dest: 'uploads/' })
import Files from "../Models/Files.js";
import { getMoodleContent } from "../Controlls/shared/Moode.js";
import { GetFeed } from "../Controlls/shared/Feed.js";
import { getCalindarS } from "../Controlls/student/Calindar.js";
import { getClassesForMoodleS } from "../Controlls/student/Moodle.js";






Router.post('/MoodleLoad', cookieJwtAuth, async (req, res) => {
    if (req.auth == 3) {
        await getClassesForMoodleS(req.id, req.body.month).then(e => {
            return res.status(200).json({
                status: 1,
                data: e
            })
        }).catch(er => {
            return res.status(500).json({
                message: 'something went wrong api'
            })
        })
    }
    else if (req.auth == 2) {
        await getClassesForMoodleT(req.id, req.body.month).then(e => {
            return res.status(200).json({
                status: 1,
                data: e
            })
        })
            .catch(er => {
                return res.status(500).json({
                    message: 'something went wrong api'
                })
            })
    }
})

Router.post('/MoodleContentLoad', cookieJwtAuth, async (req, res) => {
    if (req.auth) {
        console.log('request been done')
        await getMoodleContent(req.body.classid).then(e => {
            return res.status(200).json({
                status: 1,
                data: e
            })
        })
            .catch(er => {
                return res.status(500).json({
                    message: 'something went wrong api'
                })
            })
    }
})



//----------------------------------
Router.post('/MoodleSubmit', cookieJwtAuth, upload.array('Nfiles'), async (req, res) => {
    if (req.auth == 2) {
        await submitNewMoodleData({ ...req.body, Nfiles: req.files }).then(e => {
            return res.status(200).json({
                data: e
            })
        })
            .catch(er => {
                console.log('er')
                return res.status(500).json({
                    status: 'error'
                })
            })
    }
})

Router.post('/UpdateDumb', cookieJwtAuth, upload.array('Nfiles'), async (req, res) => {
    if (req.auth == 2) {
        await UpdateMoodDumb({ ...req.body, Nfiles: req.files }).then(e => {
            return res.status(200).json({
                data: e
            })
        })
            .catch(er => {
                console.log('er')
                return res.status(500).json({
                    status: 'error'
                })
            })
    }
})


Router.post('/DumbRemove', cookieJwtAuth, async (req, res) => {
    if (req.auth == 3) {

    }
    else if (req.auth == 2) {
        await removeDumb(req.body.Dumbid).then(e => {
            return res.status(200).json({
                status: e
            })
        })
            .catch(er => {
                return res.status(500).json({
                    status: 'error'
                })
            })
    }
})



//--------------------
Router.post('/fileDownload', cookieJwtAuth, async (req, res) => {
    console.log(req.id)
    if (req.id) {
        const { data, name } = req.body
        await Files.find({ data: data }).then(e => {
            if (e.length > 0) {
                return res.status(200).download('uploads\\' + data, name)
            }
            else {
                return res.status(500).json({
                    message: 'something went wrong'
                })
            }
        })
    }
    else{
        return res.status(404).json({
            message: 'nice try'
        })
    }
})
//---------------------
//Feed

Router.get('/Feed', cookieJwtAuth, async (req, res) => {
    await GetFeed().then(result => {
        return res.status(200).json({
            state: 1,
            data: result
        })
    })
        .catch(er => {
            return res.status(500).json({
                message: 'something went wrong'
            })
        })

})



export default Router