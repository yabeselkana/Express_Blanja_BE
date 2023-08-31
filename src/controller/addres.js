const createError = require("http-errors");
const { selectAllAddres, selectSearchAddres, selectAddres, selectAddresByiduser, insertAddres, updateAdres, deleteAddres, countData, findId } = require("../model/addres");
const commonHelper = require("../helper/common");

let addressController = {
  getAllAddres: async (req, res, next) => {
    try {
      const role = req.payload.role;
      //  console.log(role)
      if (role === "reseller") {
        return next(createError(403, `${role} not get data`));
      }
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllAddres({ limit, offset, sort, sortby });
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
      commonHelper.response(res, result.rows, 200, "get data success", pagination, role);
    } catch (error) {
      console.log(error);
    }
  },
  getSearchAddres: async (req, res, next) => {
    try {
      const role = req.payload.role;
      //  console.log(role)
      if (role === "reseller") {
        return next(createError(403, `${role} not get data`));
      }
      const keyword = req.query.keyword || "";
      // const input = req.query.input || ""

      const result = await selectSearchAddres(keyword);
      // res.send(result)
      commonHelper.response(res, result.rows, 200, "get data success", {}, role);
    } catch (error) {
      console.log(error);
    }
  },
  getDetailAddress: async (req, res, next) => {
    // const role = req.payload.role;
    // console.log(role);
    // if (role === "reseller") {
    //   return next(createError(403, `${role} not get data`));
    // }

    const id = Number(req.params.id);
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    selectAddres(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "get data success", {});
      })
      .catch((err) => res.send(err));
  },

  getSelectById: async (req, res) => {
    const id_users = String(req.params.id_users);
    console.log(id_users);
    selectAddresByiduser(id_users)
      .then((result) => commonHelper.response(res, result.rows, 200, "get data alamat success"))
      .catch((err) => res.send(err));
  },
  createAddres: async (req, res, next) => {
    const role = req.payload.role;
    //  console.log(role)
    // if (role !== "reseller") {
    //   return next(createError(403, `${role} Not Entri Data`));
    // }
    const PORT = process.env.PORT || 4000;
    const DB_HOST = process.env.DB_HOST || "localhost";
    // const photo = req.file.filename;
    const { emailaddress, recipientname, phone, address, postalcode, City, id_users } = req.body;
    const {
      rows: [count],
    } = await countData();
    const id = Number(count.count) + 1;
    const data = {
      id,
      emailaddress,
      recipientname,
      phone,
      address,
      postalcode,
      City,
      id_users,
    };
    console.log(data);
    insertAddres(data)
      .then((result) => {
        commonHelper.response(res, data, 201, "Addres created", {});
      })
      .catch((err) => {
        console.log(err);
      });
  },
  updateAddress: async (req, res, next) => {
    try {
      //   const role = req.payload.role;
      //   //  console.log(role)
      //   if (role !== "reseller") {
      //     return next(createError(403, `${role} Not Entri Data`));
      //   }
      const PORT = process.env.PORT || 4000;
      const DB_HOST = process.env.DB_HOST || "localhost";
      const id = Number(req.params.id);
      //   const photo = req.file.filename;
      const { emailaddress, recipientname, phone, address, postalcode, City, id_users } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        emailaddress,
        recipientname,
        phone,
        address,
        postalcode,
        City,
        id_users,
      };
      updateAdres(data)
        .then((result) => commonHelper.response(res, data, 200, "Catagory updated", {}, role))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteAddres: async (req, res, next) => {
    try {
      //   const role = req.payload.role;
      //   //  console.log(role)
      //   if (role !== "reseller") {
      //     return next(createError(403, `${role} Not Entri Data`));
      //   }
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      deleteAddres(id)
        .then((result) => commonHelper.response(res, result.rows, 200, "Catagory deleted", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = addressController;
