import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Feed = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    content: String,
    sender: String,
},
{timestamps:true});

export default mongoose.model('Feed', Feed);