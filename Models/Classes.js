import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Classes = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    teacherid: String,
});

export default mongoose.model('Classes', Classes);