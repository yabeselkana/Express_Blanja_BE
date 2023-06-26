const createError = require('http-errors')
const {selectAll,
          select,
          countData,
          findId,
          insert,
          update,
          deleteData} = require('../model/products')
  const commonHelper = require("../helper/common");
  const client = require('../config/redis')
  // const user = require('../controller/users')
  let productController = {
    getAllProduct:async (req, res,next) => {
      try {
     const role = req.payload.role
    // //  console.log(role)
    //   if(role === "reseller"){
    //     return next(createError(403,`${role} not get data`))
    //   }
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
        const sortby = req.query.sortby || "id"
        const sort = req.query.sort || "ASC"
        const result = await selectAll({limit,offset,sort,sortby,});
        const {rows: [count]} = await countData()
        const totalData = parseInt(count.count)
        const totalPage = Math.ceil(totalData/limit)
        const pagination ={     
              currentPage : page,
              limit:limit,
              totalData:totalData,
              totalPage:totalPage
            }
        // res.send(result)
        commonHelper.response(res, result.rows, 200, "get data success",pagination,role);
      } catch (error) {
        console.log(error);
      }
    },
    getSearchProduct:async (req, res,next) => {
      try {
        // const role = req.payload.role
        // //  console.log(role)
        //   if(role === "reseller"){
        //     return next(createError(403,`${role} not get data`))
        //   }
        const keyword = req.query.keyword || ""
        const result = await selectSearchProduct(keyword);
        // res.send(result)
        commonHelper.response(res, result.rows, 200, "get data success");
      } catch (error) {
        console.log(error);
      }
    },
    getDetailProduct: async (req, res,next) => {
      const role = req.payload.role
      //  console.log(role)
        // if(role === "reseller"){
        //   return next(createError(403,`${role} not get data`))
        // }
      const id = Number(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        return next(createError(403,"ID is Not Found"))
      }
      select(id)
      .then(
        result => {
        client.setEx(`product/${id}`,60*60,JSON.stringify(result.rows))
        commonHelper.response(res, result.rows, 200, "get data success from database",{},role)
        }
      )
      .catch(err => res.send(err)
      )
    },
    createProduct: async (req, res,next) => {
      const role = req.payload.role
      //  console.log(role)
        if(role !== "reseller"){
          return next(createError(403,`${role} Not Entri Data`))
        }
    const PORT = process.env.PORT || 4000
    const DB_HOST = process.env.DB_HOST || 'localhost'
    const photo = req.file.filename;
    const { name,stock,price,description } = req.body
    const {rows: [count]} = await countData()
    const id = Number(count.count)+1;

    const data ={
      id,
      name,
      stock,
      price,
      photo:`http://${DB_HOST}:${PORT}/img/${photo}`,
      description
    }
    // console.log(data)
    insert(data)
      .then(
        result => commonHelper.response(res, data, 201, "Product created",{},role)
      )
      .catch(err => res.send(err)
      )
    },
    updateProduct: async (req, res,next) => {

      try{
        const role = req.payload.role
        //  console.log(role)
          if(role !== "reseller"){
            return next(createError(403,`${role} Not Update Data`))
          }
        const PORT = process.env.PORT || 4000
        const DB_HOST = process.env.DB_HOST || 'localhost'
        const id = Number(req.params.id)
        const photo = req.file.filename;
        const { name,stock,price,description } = req.body
        const {rowCount} = await findId(id)
        if(!rowCount){
          return next(createError(403,"ID is Not Found"))
        }
        const data ={
          id,
          name,
          stock,
          price,
          photo:`http://${DB_HOST}:${PORT}/img/${photo}`,
          description
        }
        // console.log(data)
        update(data)
          .then(
            result => commonHelper.response(res, data, 200, "Product updated",{}, role)
            )
            .catch(err => res.send(err)
            )
          }
          catch(error){
            console.log(error);
          }
    },
    deleteProduct: async (req, res,next) => {
      try {
        const role = req.payload.role
        //  console.log(role)
          if(role !== "reseller"){
            return next(createError(403,`${role} Not Entri Data`))
          }
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return next(createError(403,"ID is Not Found"))
        }
        deleteData(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product deleted",{},role)
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = productController;
  