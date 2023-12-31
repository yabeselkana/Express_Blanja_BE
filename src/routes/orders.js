const express = require("express");
const router = express.Router();
const orderController = require("../controller/orders");
const { protect } = require("../middlewares/auth");

router
  .get("/", orderController.getAllOrder)
  .get("/:id", orderController.getDetailOrder)
  .get("/user/:id_user", orderController.getSelectById)
  .post("/", orderController.createOrder)
  .put("/:id", orderController.updateOrder)
  .delete("/:id", protect, orderController.deleteOrder);

module.exports = router;
