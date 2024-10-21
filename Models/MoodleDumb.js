import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MoodleDumb = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    classid: String,
    title: String,
    filesid: [String],
    content: [String],
    date: Date
},
{timestamps:true});

export default mongoose.model('MoodleDumb', MoodleDumb);