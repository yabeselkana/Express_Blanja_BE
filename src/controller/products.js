const createError = require('http-errors')
const{
    selectAllProduct,
    selectSearchProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countData,
    findId,
  }= require("../model/products")
  const commonHelper = require("../helper/common");
  
  let productController = {
    getAllProduct:async (req, res) => {
      try {
        const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
        const sortby = req.query.sortby || "id"
        const sort = req.query.sort || "ASC"
        const result = await selectAllProduct({limit,offset,sort,sortby,});
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
        commonHelper.response(res, result.rows, 200, "get data success",pagination);
      } catch (error) {
        console.log(error);
      }
    },
    getSearchProduct:async (req, res) => {
      try {
        const keyword = req.query.keyword || ""
        // const input = req.query.input || ""
       
        const result = await selectSearchProduct(keyword);
        // res.send(result)
        commonHelper.response(res, result.rows, 200, "get data success");
      } catch (error) {
        console.log(error);
      }
    },
    getDetailProduct: async (req, res) => {
      const id = Number(req.params.id);
      selectProduct(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },
    createProduct: async (req, res) => {
      let { name, price, stock, image ,rating,merek,id_catagory} = req.body;
      const {rows:[count]} = await countData();
      const id = Number(count.count);
      const data  = {
        id,
        name,
        stock,
        price,
        image,
        rating,
        merek,
        id_catagory

      };
         insertProduct(data )
         .then((result) => {
          commonHelper.response(res, result.rows, 201, "Product created")
         }).catch((err) => {
          console.log(err)
          
         });
    },
    updateProduct: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { name, price, stock,image,rating,merek,id_catagory} = req.body;
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return next(createError(403,"ID is Not Found"))
        }
        const data = {
          id,
          name,
          price,
          stock,
          image,
          rating,
          merek,
          id_catagory
        };
        updateProduct(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
    deleteProduct: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return next(createError(403,"ID is Not Found"))
        }
        deleteProduct(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = productController;
  