const express = require("express");
const router = express.Router();
const ApiController = require("../../controllers/ApiController");
router.get("/user", ApiController.user);
router.get("/getProductSoldList", ApiController.getProductSoldList);
router.post("/user", ApiController.newUser);
router.delete("/user/:id", ApiController.deleteUser);
router.put("/user/:id", ApiController.updateUser);
router.get("/categories", ApiController.categories);
router.post("/categories/", ApiController.addCategory);
router.delete("/categories/:id", ApiController.removeCategory);
router.put("/categories/:id", ApiController.updateCategory);
router.delete("/data/:id", ApiController.delete);
router.get("/", ApiController.api);

module.exports = router;
