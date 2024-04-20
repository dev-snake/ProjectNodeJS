const Cart = require("../models/cart");
const Product = require("../models/product");
const Voucher = require("../models/voucher");
const moment = require("moment");
const Order = require("../models/orders");
const User = require("../models/user");
const QRCode = require("qrcode");
const { uuid } = require("uuidv4");

class CartController {
	async cart(req, res, next) {
		try {
			const cartList = await Cart.find({});
			let checkCart;
			let text;
			if (cartList.length <= 0) {
				checkCart = false;
				text = "Vui lòng thêm sản phẩm vào giỏ hàng !";
			} else {
				checkCart = true;
			}
			const cartItems = await Cart.find();
			const subTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
			const shipping = 35;
			const total = subTotal + shipping;
			const voucher = req.session.voucherCode;
			res.render("cart/cart", {
				cartList,
				subTotal,
				shipping,
				total,
				voucher,
				checkCart,
				text
			});
		} catch (err) {
			res.status(404).json({ message: err });
		}
	}
	async increase(req, res, next) {
		const { id } = req.params;
		const increaseQuantity = await Cart.findById(id);
		increaseQuantity.quantity += 1;
		increaseQuantity.total = increaseQuantity.quantity * increaseQuantity.price;
		await increaseQuantity.save();
		res.redirect("/cart");
	}
	async decrease(req, res, next) {
		const { id } = req.params;
		const decreaseQuantity = await Cart.findById(id);
		if (decreaseQuantity.quantity === 1) {
			await Cart.findByIdAndDelete(id);
			res.redirect("/cart");
		} else {
			decreaseQuantity.quantity -= 1;
			decreaseQuantity.total = decreaseQuantity.quantity * decreaseQuantity.price;
			await decreaseQuantity.save();
			res.redirect("/cart");
		}
	}
	async addToCart(req, res, next) {
		try {
			const { id } = req.params;
			const { quantity } = req.body;

			const findProduct = await Product.findById(id);
			const exitstingCartItem = await Cart.findOne({ name: findProduct.name });
			if (exitstingCartItem) {
				exitstingCartItem.quantity += Number(quantity) || 1;
				exitstingCartItem.total = exitstingCartItem.quantity * exitstingCartItem.price;
				await exitstingCartItem.save();
			} else {

				const cartItem = {
					name: findProduct.name,
					quantity: Number(quantity) || 1,
					price: findProduct.price,
					image: findProduct.image,
					total: findProduct.price
				};
				await Cart(cartItem).save();
			}
			res.redirect("/cart");
		} catch (err) {
			res.status(404).json({ message: err });
		}
	}
	async deleteCart(req, res, next) {
		const { id } = req.params;
		await Cart.findByIdAndDelete(id);
		res.redirect("/cart");
	}
	async voucherCode(req, res, next) {
		try {
			const { voucher_code } = req.body;
			const findVoucher = await Voucher.findOne({ voucher_code: voucher_code });
			if (!findVoucher) {
				return res.status(404).json({ message: "Voucher code not found !!" });
			}
			if (findVoucher.voucher_code === "SALE50%") {
				const cartItems = await Cart.find();
				const subTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
				const shipping = 35;
				const applied_code = subTotal / 2 + shipping;
				req.session.voucherCode = true;
				req.session.voucherCode = JSON.stringify(applied_code);
				res.redirect("/cart");
			} else if (findVoucher.voucher_code === "FREESHIP") {
				const cartItems = await Cart.find();

				const subTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
				const shipping = 0;
				const applied_code = subTotal / 2 + shipping;
				res.render("cart", { applied_code });
			} else {
				res.json("Ưu đãi khác !");
			}
		} catch (err) {
			res.status(404).json({ message: err.message });
		}
	}

	async form_user(req, res, next) {
		const cartItems = await Cart.find({});
		const subTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
		const shipping = 35;
		const sum = subTotal + shipping;
		res.render("cart/form_user", { cartItems, subTotal, sum });
	}
	async infor_order(req, res, next) {
		try {
			const { fullname, phonenumber, city, district, email } = req.body;
			if (!fullname || !phonenumber || !city || !district || !email) {
				res.status(403).send("Vui lòng nhập thông tin đầy đủ !");
			}
			const cartItems = await Cart.find({});
			const subTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
			const shipping = 35;
			const sum = subTotal + shipping;
			req.session.customerOlder = {
				fullname,
				phonenumber,
				city,
				district,
				email
			};
			res.render("cart/infor_order", {
				customerOlder: req.session.customerOlder,
				sum
			});
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	}
	// async infor_older_voucher(req, res) {
	// 	const { voucher_code } = req.body;
	// 	const cartItems = await Cart.find({});
	// 	const subTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
	// 	const findVoucher = await Voucher.findOne({ voucher_code: voucher_code });
	// 	if (!findVoucher) {
	// 		return res.status(404).send("Voucher code not found !!");
	// 	}
	// 	const user = await User.findOne({ username: req.session.username });
	// 	if (!user) {
	// 		return res.status(404).send("User not found !!");
	// 	}
	// 	console.log(user);
	// 	const voucherIndex = user.voucherList.indexOf(voucher_code);
	// 	console.log(user.voucherList);
	// 	console.log(voucherIndex);
	// 	console.log(voucher_code);
	// 	if (voucherIndex !== -1) {
	// 		user.voucherList.splice(voucherIndex, 1);
	// 		await user.save();
	// 	}
	// 	if (findVoucher.voucher_code === "SALE50%") {
	// 		const customerOlder = req.session.customerOlder;
	// 		const cartItems = await Cart.find();
	// 		const subTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
	// 		const shipping = 35;
	// 		const sum = subTotal / 2 + shipping;
	// 		res.render("cart/infor_older", { customerOlder, sum });
	// 	} else {
	// 		res.send("Ưu đãi khác ");
	// 	}
	// }
	async infor_order_voucher(req, res) {
		const { voucher_code } = req.body;
		const cartItems = await Cart.find({});
		const subTotal = cartItems.reduce((sum, item) => sum + item.total, 0);
		const findVoucher = await Voucher.findOne({ voucher_code: voucher_code });
		if (!findVoucher) {
			return res.status(404).send("Voucher code not found !!");
		}
		const user = await User.findOne({ username: req.session.username });
		if (user) {
			let voucherIndex = -1;
			for (let i = 0; i < user.voucherList.length; i++) {
				if (user.voucherList[i].voucher_code === voucher_code) {
					voucherIndex = i;
					break;
				}
			}
			if (voucherIndex !== -1) {
				user.voucherList.splice(voucherIndex, 1);
				await user.save();
			}
		}
		if (findVoucher.voucher_code === "SALE50%") {
			const customerOlder = req.session.customerOlder;
			const shipping = 35;
			const sum = subTotal / 2 + shipping;
			res.render("cart/infor_order", { customerOlder, sum });
		} else if (findVoucher.voucher_code === "kjfyo12f") {
			const customerOlder = req.session.customerOlder;
			const shipping = 35;
			const sum = subTotal - subTotal * (20 / 100) + shipping;
			res.render("cart/infor_order", { customerOlder, sum });
		} else if (findVoucher.voucher_code === "kJhdie198d") {
			const customerOlder = req.session.customerOlder;
			const shipping = 35;
			const sum = subTotal - subTotal * (10 / 100) + shipping;
			res.render("cart/infor_order", { customerOlder, sum });
		} else if (findVoucher.voucher_code === "jhjTGH182f") {
			const customerOlder = req.session.customerOlder;
			const shipping = 35;
			const sum = subTotal - subTotal * (40 / 100) + shipping;
			res.render("cart/infor_order", { customerOlder, sum });
		} else {
			const customerOlder = req.session.customerOlder;
			const shipping = 35;
			const sum = subTotal - subTotal * (20 / 100) + shipping;
			res.render("cart/infor_order", { customerOlder, sum });
		}
	}

	async payment(req, res, next) {
		const { fullname, phonenumber, email, city, district, total, paymentMethod } = req.body;
		try {
			const orderDate = new Date(Date.now());
			const formattedTime = moment(orderDate).format("D/M/YYYY HH:mm");
			const customerOrder = await Cart.find({});
			const username = req.session.username;
			const order_id = uuid().slice(0, 6);
			const cartItemId = await Cart.find();
			const product = await Product.find();
			for (let i = 0; i < cartItemId.length; i++) {
				for (let j = 0; j < product.length; j++) {
					if (cartItemId[i].name === product[j].name) {
						product[j].number_of_orders += 1;
						await product[j].save();
						break;
					}
				}
			}
			const user = await User.findOne({ username });
			if (user) {
				const quantityOrder = customerOrder.reduce((sum, item) => sum + item.quantity, 0);
				user.point += quantityOrder * 10;
				await user.save();
			}
			const newOrder = {
				fullname,
				phonenumber,
				email,
				city,
				district,
				total,
				paymentMethod,
				customerOrder,
				orderDate: formattedTime,
				user_id: username || "Khách vãng lai",
				order_status: "Pending",
				order_id
			};
			let link_icon = "";
			if (paymentMethod === "zalopay") {
				link_icon = "https://cdn2.cellphones.com.vn/x/media/logo/gw2/zalopay.png";
			} else if (paymentMethod === "momo") {
				link_icon = "https://cdn2.cellphones.com.vn/x/media/logo/gw2/momo_vi.png";
			} else if (paymentMethod === "shopeepay") {
				link_icon = "https://cdn2.cellphones.com.vn/x/media/logo/gw2/shopeepay.png";
			} else {
				link_icon = "https://cdn2.cellphones.com.vn/x/media/logo/gw2/vnpay.png";
			}
			const url = req.query.url || "http://localhost:3000/cart/payment";
			const qrCode = await QRCode.toDataURL(url);
			await Order.create(newOrder);
			await Cart.deleteMany();
			res.render("cart/order_success", {
				qrCode,
				fullname,
				phonenumber,
				city,
				district,
				total,
				paymentMethod,
				orderDate: formattedTime,
				order_id,
				link_icon
			});
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new CartController();
