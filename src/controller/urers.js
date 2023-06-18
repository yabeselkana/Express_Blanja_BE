const createError = require('http-errors')
const{
    selectAllUsers,
    selectSearchUsers,
    selectUsers,
    insertUsers,
    updateUsers,
    deleteUsers,
    countData,
    findId,
  }= require("../model/users")
  const commonHelper = require("../helper/common");
  
  let usersController = {
    getAllUsers:async (req, res) => {
      try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5
        const offset = (page - 1) * limit
          const sortby = req.query.sortby || "id"
          const sort = req.query.sort || "ASC"
          const result = await selectAllUsers({limit,offset,sort,sortby});
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
    getSearchUsers:async (req, res) => {
      try {
        const keyword = req.query.keyword || ""
        // const input = req.query.input || ""
       
        const result = await selectSearchUsers(keyword);
        // res.send(result)
        commonHelper.response(res, result.rows, 200, "get data success");
      } catch (error) {
        console.log(error);
      }
    },
    getDetailUsers: async (req, res) => {
      const id = Number(req.params.id);
      selectUsers(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },
    createUsers: async (req, res) => {
      let {name,email,password} = req.body;
      const {rows:[count]} = await countData();
      const id = Number(count.count);
      const data  = {
        id,
        name,
        email,
        password,
        
      };
         insertUsers(data )
         .then((result) => {
          commonHelper.response(res, result.rows, 201, "Users created")
         }).catch((err) => {
          console.log(err)
          
         });
    },
    updateUsers: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { name,email,password} = req.body;
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return next(createError(403,"ID is Not Found"))
        }
        const data = {
          id,
          name,
          email,
          password,
        };
        updateUsers(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Users updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
    deleteUsers: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return next(createError(403,"ID is Not Found"))
        }
        deleteUsers(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Users deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = usersController;