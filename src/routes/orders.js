const express = require("express");
const router = express.Router();
const orderController = require("../controller/orders");
const { protect } = require("../middlewares/auth");

router
  .get("/", protect, orderController.getAllOrder)
  .get("/:id", protect, orderController.getDetailOrder)
  .get("/user/:id_user", orderController.getSelectById)
  .post("/", protect, orderController.createOrder)
  .put("/:id", protect, orderController.updateOrder)
  .delete("/:id", protect, orderController.deleteOrder);

module.exports = router;
