const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
// const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/upload");
// const { hitCacheProductDetail, clearCacheProductDetail } = require("../middlewares/redis");
// const { validate, myCors } = require("../middlewares/common");

router
  .get("/", productController.getAllProduct)
  .get("/search/", productController.getSearchProduct)
  .get("/:id", productController.getDetailProduct)
  .post("/", upload, productController.createProduct)
  .put("/:id", upload, productController.updateProduct)
  .delete("/:id", productController.deleteProduct);

module.exports = router;
