import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Messagedumbs = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    classid: String,
    userid: String,
    content: String,
},
{timestamps:true});

export default mongoose.model('Messagedumbs', Messagedumbs);