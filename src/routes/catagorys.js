const express = require("express");
const router = express.Router();
const catagoryController = require("../controller/catagotys");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

router
  .get("/", catagoryController.getAllCatagory)
  .get("/search/", catagoryController.getSearchCatagory)
  .get("/:id", catagoryController.getDetailCatagory)
  .post("/", upload, catagoryController.createCatagory)
  .put("/:id", upload, catagoryController.updateCatagory)
  .delete("/:id", catagoryController.deleteCatagory);

module.exports = router;
