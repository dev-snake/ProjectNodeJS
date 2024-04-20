const mongoose = require("mongoose");
const db = "mongodb://127.0.0.1/dbearphone";
const connect = async () => {
	try {
		await mongoose.connect(db);
		console.log("Connect Succesfully  😍");
	} catch (err) {
		console.error("Connect Fail !!! 🥵");
	}
};

module.exports = { connect };
