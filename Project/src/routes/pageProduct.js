const express = require("express");
const router = express.Router();
const pageProducts = require("../controllers/PageProductController");
router.get("/high_to_low", pageProducts.sortHighToLow);
router.get("/low_to_high", pageProducts.sortLowToHigh);
router.get("/:id", pageProducts.categoryProduct);
router.get("/", pageProducts.pageProduct);
module.exports = router;
