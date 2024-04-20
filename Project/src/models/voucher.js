const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const voucher = new Schema({
    id: ObjectId,
    voucher_code: String,
    image: String,
    title: String,
    exchange_value: Number
});
module.exports = mongoose.model("vouchers", voucher);
