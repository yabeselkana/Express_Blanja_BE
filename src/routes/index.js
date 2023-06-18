const express = require("express");
const router = express.Router();
const ProductRouter = require("../routes/products");
const CatagoryRouter = require("../routes/catagorys");
const OrderRouter = require("../routes/orders");
const UserRouter = require("../routes/users");

router.use("/products", ProductRouter);
router.use("/catagorys", CatagoryRouter);
router.use("/orders", OrderRouter);
router.use("/users", UserRouter);


module.exports = router;
