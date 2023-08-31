const express = require("express");
const router = express.Router();
const ProductRouter = require("../routes/products");
const CatagoryRouter = require("../routes/catagorys");
const OrderRouter = require("../routes/orders");
const CekoutRouter = require("../routes/cekout");
const PaymentRouter = require("../routes/payment");
const AddresRouter = require("../routes/addres");
const UsersRouter = require("./users");

router.use("/products", ProductRouter);
router.use("/catagorys", CatagoryRouter);
router.use("/address", AddresRouter);
router.use("/orders", OrderRouter);
router.use("/cekout", CekoutRouter);
router.use("/payment", PaymentRouter);
router.use("/users", UsersRouter);

module.exports = router;
