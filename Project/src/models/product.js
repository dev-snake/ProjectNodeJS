const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const product = new Schema(
    {
        name: String,
        description: String,
        price: Number,
        product_Id: Number,
        image: String,
        bestselling_Product: { type: Number, default: 0 },
        slug: { type: String, slug: "name", unique: true },
        view: Number,
        comments: Array,
        category_id: Number,
        number_of_orders: Number
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("product", product);
