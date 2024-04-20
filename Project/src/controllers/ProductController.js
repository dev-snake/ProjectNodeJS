const Product = require("../models/product");
const Cart = require("../models/cart");
const moment = require("moment");
const authenticateToken = require("../middleware/authenticateToken");
const User = require("../models/user");

class ProductController {
	async productDetail(req, res, next) {
		const showDetail = await Product.findOne({ slug: req.params.slug });
		await Product.findOneAndUpdate({ slug: req.params.slug }, { $inc: { view: 1 } });
		const commentList = showDetail.comments;
		res.render("showDetails/detail", { showDetail, commentList });
	}

	async showHome(req, res, next) {
		try {
			const { search } = req.query;
			const { favourite } = req.query;
			if (favourite) {
				const favouriteProductId = await Product.findById(favourite);
				console.log("This is a favourite product!", favouriteProductId);
			}
			if (search) {
				const products = await Product.findOne({ name: { $regex: search, $options: "i" } });
				if (!products) return res.redirect("/?notfound=true")
				const relatedProducts = await Product.find({ category_id: products.category_id });
				return res.render("result.search.hbs", { relatedProducts, search })
			}
			const products = await Product.find({});
			const bestSelling = await Product.find({
				number_of_orders: { $gte: 2 }
			});
			const productsWithManyViews = await Product.find({ view: { $gte: 50 } });
			res.render("home", {
				products,
				bestSelling,
				productsWithManyViews
			});
		} catch (error) {
			next(error);
		}
	}
	async comments(req, res, next) {
		try {
			const { slug } = req.params;
			const { content } = req.body;
			if (!content) return res.status(400).redirect(`/product/${slug}?warning=true`);
			const product = await Product.findOne({ slug });
			const commentTime = new Date(Date.now());
			const formattedTime = moment(commentTime).format("D/M/YYYY HH:mm");
			product.comments.push({
				content,
				username: req.session.username,
				commentTime: formattedTime
			});
			await product.save();
			res.redirect(`/product/${slug}`);
		} catch (err) {
			res.status(500).json(err);
		}
	}

}
module.exports = new ProductController();
