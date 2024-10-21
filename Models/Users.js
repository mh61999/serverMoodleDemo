import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Users = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: String,
    password: String,
    phone: String,
    email: String,
    firstname: String,
    lastname: String,
    authRank: Number,
});

export default mongoose.model('Users', Users);