const Product = require("./Product");
const auth = require("./auth");
const admin = require("./admin");
const api = require("./api/api");
const profile = require("./profile");
const pageProduct = require("./pageProduct.js");
const cart = require("./cart.js");
const news = require("./news.js");
const route = (app) => {
	app.use("/auth", auth);
	app.use("/admin", admin);
	app.use("/api", api);
	app.use("/profile", profile);
	app.use("/products", pageProduct);
	app.use("/cart", cart);
	app.use("/news", news);
	app.use("/", Product);
};
module.exports = route;
