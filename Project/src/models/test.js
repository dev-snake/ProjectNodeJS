const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const infor = new Schema({
    id: Number,
    name: String,
    department: String,
    Date: String
});
module.exports = mongoose.model("quanLiThongTin", infor);