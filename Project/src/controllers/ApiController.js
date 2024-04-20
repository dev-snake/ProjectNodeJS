const Product = require("../models/product");
const User = require("../models/user");
const Categories = require("../models/categories");
class ApiController {
	async getProductSoldList(req, res, next) {
		try {
			const products = await Product.find({ number_of_orders: { $gte: 1 } });
			res.json(products);
		} catch (error) {
			next(error);
		}
	}
	async api(req, res, next) {
		const { id } = req.query;
		try {
			const products = await Product.find({});
			res.json(products);
		} catch (error) {
			next(error);
		}
	}
	async user(req, res, next) {
		try {
			const users = await User.find({});
			return res.status(200).json(users);
		} catch (err) {
			next(err);
		}
	}
	async newUser(req, res, next) {
		const { name, email, password } = req.body;
		await User.create({ name, email, password });
		return res.status(200).json({ message: "New user created" });
	}
	async deleteUser(req, res, next) {
		const { id } = req.params;
		await User.findByIdAndDelete(id);
		return res.status(200).json({ message: "User deleted" });
	}
	async updateUser(req, res, next) {
		const { name, email, password } = req.body;
		const { id } = req.params;
		const newUser = {
			name,
			password,
			email
		};
		await User.findByIdAndUpdate(id, newUser, { new: true });
		return res.status(200).json({ message: "User updated" });
	}
	async categories(req, res, next) {
		try {
			const categories = await Categories.find({});
			return res.status(200).json(categories);
		} catch (error) {
			next(error);
		}
	}
	async addCategory(req, res, next) {
		const { name } = req.body;
		const newCategory = {
			name,
			category
		};
		await Categories.create(newCategory);
		return res.status(200).json(newCategory);
	}
	async removeCategory(req, res, next) {
		const { id } = req.params;
		await Categories.findByIdAndDelete(id);
		return res.status(200).json({ message: "Removed category" });
	}
	async updateCategory(req, res, next) {
		const { id } = req.params;
		const newUpdate = {
			name: "Update"
		};
		await Categories.update(id, newUpdate, { new: true });
		return res.status(200).json({ message: "Updated category" });
	}
	async delete(req, res, next) {
		try {
			await Product.deleteOne({ _id: req.params.id });
			res.redirect("/admin/addProduct");
		} catch (error) {
			console.log(error.message);
		}
	}

}

module.exports = new ApiController();
