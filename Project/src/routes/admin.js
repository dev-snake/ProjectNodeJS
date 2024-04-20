const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");
const { storage, upload } = require("./lib/multer");
router.get("/CRUD", adminController.showCRUD);
router.get("/order_manager", adminController.showOrderManager);
router.get("/BXH", adminController.BXH)
router.get("/order_manager/:id", adminController.orderDetails);
router.get("/user_manager/", adminController.user_manager);
router.get("/statistical/", adminController.statistical);
router.get("/:id/edit", adminController.editProduct);
router.put("/:id", upload.single("image"), adminController.updateProduct);
router.post("/order_manager/:id", adminController.order_confirmation);
router.post("/CRUD", upload.single("image"), adminController.CRUD);
router.post("/delete/:id", adminController.deleteProduct);
router.post("/user_manager/lock-up/:id", adminController.user_managerLock);
router.post("/user_manager/open/:id", adminController.user_managerOpen);
router.get("/", adminController.admin);
module.exports = router;
