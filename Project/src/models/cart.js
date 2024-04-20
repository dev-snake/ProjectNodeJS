const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const cartSchema = new Schema(
    {
        id: ObjectId,
        name: String,
        quantity: { type: Number, default: 1 },
        price: Number,
        image: String,
        discount: String,
        total: Number
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("cart", cartSchema);
