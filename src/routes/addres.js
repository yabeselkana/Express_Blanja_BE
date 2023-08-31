const express = require("express");
const router = express.Router();
const addressController = require("../controller/addres");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

router
  .get("/", protect, addressController.getAllAddres)
  .get("/search/", protect, addressController.getSearchAddres)
  .get("/:id", protect, addressController.getDetailAddress)
  .get("/user/:id_users", addressController.getSelectById)
  .post("/", protect, upload, addressController.createAddres)
  .put("/:id", protect, upload, addressController.updateAddress)
  .delete("/:id", protect, addressController.deleteAddres);

module.exports = router;
