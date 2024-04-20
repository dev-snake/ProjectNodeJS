const Product = require("../models/product");
const Categories = require("../models/categories");
class PageProductController {
	async pageProduct(req, res, next) {
		try {
			const { search } = req.query;
			if (search) {
				const products = await Product.findOne({ name: { $regex: search, $options: "i" } });
				if (!products) return res.redirect("/?notfound=true")
				const relatedProducts = await Product.find({ category_id: products.category_id });
				return res.render("result.search.hbs", { relatedProducts, search })
			}
			const productList = await Product.find({}).limit(4);
			const categoryList = await Categories.find({});
			res.render("category/category", { productList, categoryList });
		} catch (error) {
			return res.status(404).json({ error: error });
		}
	}
	async categoryProduct(req, res, next) {
		try {
			const { search } = req.query;
			if (search) {
				const products = await Product.findOne({ name: { $regex: search, $options: "i" } });
				if (!products) return res.redirect("/?notfound=true")
				const relatedProducts = await Product.find({ category_id: products.category_id });
				return res.render("result.search.hbs", { relatedProducts, search })
			}
			const categoryList = await Categories.find({});
			const { id } = req.params;
			const productList = await Product.find({ category_id: id });
			res.render("category/categorylist", { productList, categoryList });
		} catch (error) {
			console.error(error);
			return res.status(404).json({ error: error });
		}
	}
	async sortLowToHigh(req, res, next) {
		try {
			const categoryList = await Categories.find({});
			const arrProduct = await Product.find();
			const lowTohighPrice = arrProduct.sort((a, b) => a.price - b.price);
			res.render("category/lowTohigh", { lowTohighPrice, categoryList });
		} catch (error) {
			console.error(error);
			res.status(404).json({ message: error.message });
		}
	}
	async sortHighToLow(req, res, next) {
		try {
			const categoryList = await Categories.find({});
			const arrProduct = await Product.find();
			const highToLowPrice = arrProduct.sort((a, b) => b.price - a.price);
			res.render("category/highToLow", { highToLowPrice, categoryList });
		} catch (error) {
			console.error(error);
			res.status(404).json({ message: error.message });
		}
	}
}
module.exports = new PageProductController();
