const express = require("express");
const router = express.Router();
const newController = require("../controllers/NewsController");
router.get("/", newController.news);
module.exports = router;
