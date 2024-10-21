import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Files = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    data: String,
},
{timestamps:true});

export default mongoose.model('Files', Files);