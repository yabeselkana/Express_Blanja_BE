const createError = require("http-errors");
const { selectAllCekout, selectCekout, selectCekoutbyid, insertCekout, updateCekout, deleteCekout, countData, findId } = require("../model/cekout");
const commonHelper = require("../helper/common");

let cekoutController = {
  getAllCekout: async (req, res, next) => {
    try {
      // const role = req.payload.role;
      //  console.log(role)

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllCekout({ limit, offset, sort, sortby });
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
  getDetailCekout: async (req, res, next) => {
    const role = req.payload.role;
    //  console.log(role)
    // if (role === "reseller") {
    //   return next(createError(403, `${role} not get data`));
    // }
    const id = Number(req.params.id);
    selectCekout(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success", {});
      })
      .catch((err) => res.send(err));
  },
  getSelectById: async (req, res) => {
    const id_user = String(req.params.id_user);
    selectCekoutbyid(id_user)
      .then((result) => commonHelper.response(res, result.rows, 200, "get data success"))
      .catch((err) => res.send(err));
  },
  createCekout: async (req, res, next) => {
    // const role = req.payload.role;
    //  console.log(role)
    // if (role === "reseller") {
    //   return next(createError(403, `${role} not get data`));
    // }
    let { id_Addres, qty, id_shipping, total_price, id_product, id_user } = req.body;
    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count) + 1;
    const data = {
      id,
      id_Addres,
      qty,
      id_shipping,
      total_price,
      id_product,
      id_user,
    };
    insertCekout(data)
      .then((result) => {
        commonHelper.response(res, data, 201, "Product created", {});
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateCekout: async (req, res, next) => {
    try {
      const role = req.payload.role;
      //  console.log(role)
      if (role === "reseller") {
        return next(createError(403, `${role} not get data`));
      }
      const id = Number(req.params.id);
      const { id_Addres, qty, id_shipping, total_price, id_product, id_user } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        id_Addres,
        qty,
        id_shipping,
        total_price,
        id_product,
        id_user,
      };
      updateCekout(data)
        .then((result) => commonHelper.response(res, data, 200, "Product updated", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteCekout: async (req, res, next) => {
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
      deleteCekout(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Order deleted"))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = cekoutController;
