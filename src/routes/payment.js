const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment");
const { protect } = require("../middlewares/auth");

router
  .get("/", paymentController.getAllPayment)
  .get("/:id", paymentController.getDetailPayment)
  .get("/user/:id_user", paymentController.getSelectById)
  .post("/", paymentController.createPayment)
  .put("/:id", paymentController.updatePayment)
  .delete("/:id", paymentController.deletePayment);

module.exports = router;
