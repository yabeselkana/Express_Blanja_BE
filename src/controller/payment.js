const createError = require("http-errors");
const { selectAllPayment, selectPayment, selectPaymentbyid, insertPayment, updatePayment, deletePayment, countData, findId } = require("../model/payment");
const commonHelper = require("../helper/common");

let paymentController = {
  getAllPayment: async (req, res, next) => {
    try {
      // const role = req.payload.role;
      //  console.log(role)

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllPayment({ limit, offset, sort, sortby });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success", pagination);
    } catch (error) {
      console.log(error);
    }
  },
  getDetailPayment: async (req, res, next) => {
    const role = req.payload.role;
    //  console.log(role)
    // if (role === "reseller") {
    //   return next(createError(403, `${role} not get data`));
    // }
    const id = Number(req.params.id);
    selectPayment(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success", {});
      })
      .catch((err) => res.send(err));
  },
  getSelectById: async (req, res) => {
    const id_user = String(req.params.id_user);
    selectPaymentbyid(id_user)
      .then((result) => commonHelper.response(res, result.rows, 200, "get data success"))
      .catch((err) => res.send(err));
  },
  createPayment: async (req, res, next) => {
    // const role = req.payload.role;
    //  console.log(role)
    // if (role === "reseller") {
    //   return next(createError(403, `${role} not get data`));
    // }
    let { qty, total_price, id_product, id_user } = req.body;
    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count) + 1;
    const data = {
      id,
      qty,
      total_price,
      id_product,
      id_user,
    };
    console.log(data);
    insertPayment(data)
      .then((result) => {
        commonHelper.response(res, data, 201, "Product created", {});
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updatePayment: async (req, res, next) => {
    try {
      const role = req.payload.role;
      //  console.log(role)
      if (role === "reseller") {
        return next(createError(403, `${role} not get data`));
      }
      const id = Number(req.params.id);
      const { qty, total_price, id_product } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        qty,
        total_price,
        id_product,
      };
      updatePayment(data)
        .then((result) => commonHelper.response(res, data, 200, "Product updated", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deletePayment: async (req, res, next) => {
    try {
      const role = req.payload.role;
      //  console.log(role)
      // if (role === "reseller") {
      //   return next(createError(403, `${role} not get data`));
      // }
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      deletePayment(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Order deleted"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = paymentController;
