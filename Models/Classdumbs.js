import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Classdumbs = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    classid: String,
    userid: String,
});

export default mongoose.model('Classdumbs', Classdumbs);