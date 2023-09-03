const express = require("express");
const router = express.Router();
const cekoutController = require("../controller/cekout");
const { protect } = require("../middlewares/auth");

router
  .get("/", cekoutController.getAllCekout)
  .get("/:id", cekoutController.getDetailCekout)
  .get("/user/:id_user", cekoutController.getSelectById)
  .post("/", cekoutController.createCekout)
  .put("/:id", cekoutController.updateCekout)
  .delete("/:id", cekoutController.deleteCekout);

module.exports = router;
