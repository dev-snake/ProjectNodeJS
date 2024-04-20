const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const categories = new Schema({
    id: ObjectId,
    category_id: String,
    category_name: String,
    category_description: String
});
module.exports = mongoose.model("categories", categories);
