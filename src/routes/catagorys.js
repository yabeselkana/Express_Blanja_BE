const express = require("express");
const router = express.Router();
const catagoryController = require("../controller/catagotys");

router.get("/", catagoryController.getAllCatagory)
.get("/search/", catagoryController.getSearchCatagory)
.get("/:id", catagoryController.getDetailCatagory)
.post("/", catagoryController.createCatagory)
.put("/:id", catagoryController.updateCatagory)
.delete("/:id", catagoryController.deleteCatagory);

module.exports = router;
