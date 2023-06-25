const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors')
const{
    cerate,
    findEmail,
  }= require("../model/users")
  const commonHelper = require("../helper/common");
  const authHelper = require("../helper/auth")
  
let usersController = {
   register:async (req, res,next) => {
        const { fullname, email,password,role} = req.body;   
      const { rowCount } = await findEmail(email);
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password);
        const id = uuidv4()
        if(rowCount){
          return next(createError(403,"Email is already used"))
        }
        const data ={
          id,
          fullname,
          email,
          passwordHash,
          role
        }
        cerate(data)
        .then((result) => {
          commonHelper.response(res, result.rows, 201, "Register created")
          
        }).catch((err) => {
          console.log(err)
        });
        
     },  

   login: async (req, res,next) => {
  const {email,password} = req.body
  const {rows : [user]} = await findEmail(email)
  if(!user){
    return next(createError(403,"Email false"))
  }
  const isValidPassword = bcrypt.compareSync(password,user.password)
  if(!isValidPassword){
    return next(createError(403,"password false"))}

    delete user.password
    const payload = {
      email: user.email,
      role : user.role
    }
    user.token = authHelper.generateToken(payload)
    user.refreshToken = authHelper.refershToken(payload)
    commonHelper.response(res,user,201,'login is successful')
   },
   
   profile : async (req,res,next)=>{
    const email = req.payload.email
    const {rows:[user]} = await findEmail(email)
    delete user.password
    commonHelper.response(res,user,200)
   },
   refreshToken : (req,res)=>{
    const refershToken = req.body.refershToken
    const decoded = jwt.verify(refershToken, process.env.SECRETE_KEY_JWT)
    const payload ={
      email : decoded.email,
      role : decoded.role
    }
    const result ={
      token : authHelper.generateToken(payload),
      refershToken : authHelper.refershToken(payload)
    }
    commonHelper.response(res,result,200,'Refersh Token is successful')
  }
   
  };
  
  module.exports = usersController;