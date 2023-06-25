const createError = require('http-errors')
const{
    selectAllCatagory,
    selectSearchCatagory,
    selectCatagory,
    insertCatagory,
    updateCatagory,
    deleteCatagory,
    countData,
    findId,
  }= require("../model/catagorys")
  const commonHelper = require("../helper/common");
  
  let catagoryController = {
    getAllCatagory:async (req, res,next) => {
      try {
        const role = req.payload.role
        //  console.log(role)
          if(role === "reseller"){
            return next(createError(403,`${role} not get data`))
          }
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const offset = (page - 1) * limit
          const sortby = req.query.sortby || "id"
          const sort = req.query.sort || "ASC"
          const result = await selectAllCatagory({limit,offset,sort,sortby});
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
    getSearchCatagory:async (req, res,next) => {
      try {
        const role = req.payload.role
        //  console.log(role)
          if(role === "reseller"){
            return next(createError(403,`${role} not get data`))
          }
        const keyword = req.query.keyword || ""
        // const input = req.query.input || ""
       
        const result = await selectSearchCatagory(keyword);
        // res.send(result)
        commonHelper.response(res, result.rows, 200, "get data success",{},role);
      } catch (error) {
        console.log(error);
      }
    },
    getDetailCatagory: async (req, res,next) => {
      const role = req.payload.role
       console.log(role)
        if(role === "reseller"){
          return next(createError(403,`${role} not get data`))
        }

        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return next(createError(403,"ID is Not Found"))
        }
      selectCatagory(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success",{},role);
        })
        .catch((err) => 
        res.send(err));
    },
    createCatagory: async (req, res,next) => {
      const role = req.payload.role
      //  console.log(role)
        if(role !== "reseller"){
          return next(createError(403,`${role} Not Entri Data`))
        }
    const PORT = process.env.PORT || 4000
    const DB_HOST = process.env.DB_HOST || 'localhost'
    const photo = req.file.filename
      const {name} = req.body
      const {rows:[count]} = await countData();
      const id = Number(count.count);
      const data  = {
        id,
        image :`http://${DB_HOST}:${PORT}/img/${photo}`,
        name,
        
      };
         insertCatagory(data )
         .then((result) => {
          commonHelper.response(res, data, 201, "Catagory created",{},role)
         }).catch((err) => {
          console.log(err)
          
         });
    },
    updateCatagory: async (req, res,next) => {
      try {
        const role = req.payload.role
        //  console.log(role)
          if(role !== "reseller"){
            return next(createError(403,`${role} Not Entri Data`))
          }
        const PORT = process.env.PORT || 4000
        const DB_HOST = process.env.DB_HOST || 'localhost'
        const id = Number(req.params.id)
        const photo = req.file.filename;
        const { name} = req.body;
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return next(createError(403,"ID is Not Found"))
        }
        const data = {
          id,
          image:`http://${DB_HOST}:${PORT}/img/${photo}`,
          name,
        };
        updateCatagory(data)
          .then((result) =>
            commonHelper.response(res, data, 200, "Catagory updated",{},role)
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
    deleteCatagory: async (req, res,next) => {
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
        deleteCatagory(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Catagory deleted",{},role)
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = catagoryController;