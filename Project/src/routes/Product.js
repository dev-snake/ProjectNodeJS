const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
router.get("/product/:slug", ProductController.productDetail);
router.post("/product/:slug", ProductController.comments);
router.get("/", ProductController.showHome);
module.exports = router;
