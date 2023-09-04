const express = require("express");
const router = express.Router();
const addressController = require("../controller/addres");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

router
  .get("/", addressController.getAllAddres)
  .get("/search/", addressController.getSearchAddres)
  .get("/:id", addressController.getDetailAddress)
  .get("/user/:id_users", addressController.getSelectById)
  .post("/", protect, upload, addressController.createAddres)
  .put("/:id", upload, addressController.updateAddress)
  .delete("/:id", addressController.deleteAddres);

module.exports = router;
