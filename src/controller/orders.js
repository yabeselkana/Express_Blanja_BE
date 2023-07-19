const createError = require("http-errors");
const { selectAllOrder, selectOrder, insertOrder, updateOrder, deleteOrder, countData, findId } = require("../model/orders");
const commonHelper = require("../helper/common");

let orderController = {
  getAllOrder: async (req, res, next) => {
    try {
      const role = req.payload.role;
      //  console.log(role)

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllOrder({ limit, offset, sort, sortby });
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
  getDetailOrder: async (req, res, next) => {
    const role = req.payload.role;
    //  console.log(role)
    // if (role === "reseller") {
    //   return next(createError(403, `${role} not get data`));
    // }
    const id = Number(req.params.id);
    selectOrder(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success", {});
      })
      .catch((err) => res.send(err));
  },
  createOrder: async (req, res, next) => {
    // const role = req.payload.role;
    //  console.log(role)
    // if (role === "reseller") {
    //   return next(createError(403, `${role} not get data`));
    // }
    let { address, qty, shipping, total_price, id_product, id_user } = req.body;
    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count);
    const data = {
      id,
      address,
      qty,
      shipping,
      total_price,
      id_product,
      id_user,
    };
    insertOrder(data)
      .then((result) => {
        commonHelper.response(res, data, 201, "Product created", {});
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateOrder: async (req, res, next) => {
    try {
      const role = req.payload.role;
      //  console.log(role)
      if (role === "reseller") {
        return next(createError(403, `${role} not get data`));
      }
      const id = Number(req.params.id);
      const { address, qty, shiping, total_price, id_product } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        address,
        qty,
        shiping,
        total_price,
        id_product,
      };
      updateOrder(data)
        .then((result) => commonHelper.response(res, data, 200, "Product updated", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteOrder: async (req, res, next) => {
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
      deleteOrder(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Order deleted"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = orderController;
