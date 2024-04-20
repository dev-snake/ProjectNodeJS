const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const test2 = new Schema({
    id: ObjectId,
    name: String,
});
module.exports = mongoose.model("category", test2);