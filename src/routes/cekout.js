const express = require("express");
const router = express.Router();
const cekoutController = require("../controller/cekout");
const { protect } = require("../middlewares/auth");

router
  .get("/", protect, cekoutController.getAllCekout)
  .get("/:id", protect, cekoutController.getDetailCekout)
  .get("/user/:id_user", cekoutController.getSelectById)
  .post("/", protect, cekoutController.createCekout)
  .put("/:id", protect, cekoutController.updateCekout)
  .delete("/:id", protect, cekoutController.deleteCekout);

module.exports = router;
