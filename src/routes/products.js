const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
// const { hitCacheProductDetail, clearCacheProductDetail } = require("../middlewares/redis");
// const { validate, myCors } = require("../middlewares/common");

router
  .get("/", productController.getAllProduct)
  .get("/search/", protect, productController.getSearchProduct)
  .get("/:id", protect, productController.getDetailProduct)
  .post("/", protect, upload, productController.createProduct)
  .put("/:id", protect, upload, productController.updateProduct)
  .delete("/:id", protect, productController.deleteProduct);

module.exports = router;
