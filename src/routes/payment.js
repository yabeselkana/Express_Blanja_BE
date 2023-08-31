const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment");
const { protect } = require("../middlewares/auth");

router
  .get("/", protect, paymentController.getAllPayment)
  .get("/:id", protect, paymentController.getDetailPayment)
  .get("/user/:id_user", paymentController.getSelectById)
  .post("/", protect, paymentController.createPayment)
  .put("/:id", protect, paymentController.updatePayment)
  .delete("/:id", protect, paymentController.deletePayment);

module.exports = router;
