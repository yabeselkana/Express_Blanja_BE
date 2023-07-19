const express = require("express");
const router = express.Router();
const catagoryController = require("../controller/catagotys");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

router
  .get("/", protect, catagoryController.getAllCatagory)
  .get("/search/", protect, catagoryController.getSearchCatagory)
  .get("/:id", protect, catagoryController.getDetailCatagory)
  .post("/", protect, upload, catagoryController.createCatagory)
  .put("/:id", protect, upload, catagoryController.updateCatagory)
  .delete("/:id", protect, catagoryController.deleteCatagory);

module.exports = router;
