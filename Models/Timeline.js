import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Timeline = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    classid: String,
    DateB:Date,
    DateE: Date,
},
{timestamps:true});

export default mongoose.model('Timeline', Timeline);