class NewController {
	async news(req, res, next) {
		res.send("ok");
	}
}
module.exports = new NewController();
