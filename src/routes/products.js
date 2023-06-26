const express = require("express");
const router = express.Router();
const productController = require("../controller/products");
const {protect} = require('../middlewares/auth')
const upload = require('../middlewares/upload')
const {hitCacheProductDetail,clearCacheProductDetail} = require('../middlewares/redis')
const {validate,myCors} = require('../middlewares/common')

router.get("/", protect,productController.getAllProduct)
.get("/search/",protect, productController.getSearchProduct)
.get("/:id",protect,hitCacheProductDetail ,productController.getDetailProduct)
.post("/",protect, upload.single('photo'),productController.createProduct)
.put("/:id",protect, clearCacheProductDetail,upload.single('photo'),productController.updateProduct)
.delete("/:id",protect,clearCacheProductDetail, productController.deleteProduct);

module.exports = router;
