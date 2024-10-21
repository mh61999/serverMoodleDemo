import Classes from "../../Models/Classes.js";
import MoodleDumb from "../../Models/MoodleDumb.js";
import Files from "../../Models/Files.js";
import User from '../../Models/Users.js'
import { getCalindarSBymonth } from "./Calindar.js";
import Classdumbs from "../../Models/Classdumbs.js";


export async function getClassesForMoodleS(id, month) {
    return new Promise(async (resolve, reject) => {
        await Classdumbs.find({ userid: id }).then(async classes => {
            await getCalindarSBymonth(id, month).then(async k => {
                let array = []
                if (classes.length > 0) {
                    for (let i in classes) {
                        await Classes.findById(classes[i].classid).then(async Cinfo => {
                            await User.findById(Cinfo.teacherid).then(async teacher => {
                                array.push({
                                    _id: Cinfo._id,
                                    title: Cinfo.title,
                                    teacher: teacher.firstname + ' ' + teacher.lastname
                                })
                            })
                        })
                    }
                }
                resolve({ calindar: k, Moodle: array })
            })

        })

    })


}