const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { selectUsers, cerateCostomer, cerateSeller, findUUID, updateUsersCostomer, updateUsersSeller, findEmail } = require("../model/users");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");
const cloudinary = require("../middlewares/cloudinary");
const Joi = require("joi");
let usersController = {
  getSelectUsers: async (req, res) => {
    const id = String(req.params.id);
    const { rowCount } = await findUUID(id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectUsers(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Get Users Detail Success");
      })
      .catch((err) => res.send(err));
  },

  registerCostomer: async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const { rowCount } = await findEmail(email);
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password);
    const id = uuidv4();
    if (rowCount) {
      return next(createError(403, "Email is already used"));
    }
    const data = {
      id,
      name,
      email,
      passwordHash,
      role,
    };
    cerateCostomer(data)
      .then((result) => {
        commonHelper.response(res, data, 201, "Register created");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  register: async (req, res, next) => {
    const { name, email, name_store, phone, password, role } = req.body;
    const { rowCount } = await findEmail(email);
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password);
    const id = uuidv4();
    if (rowCount) {
      return next(createError(403, "Email is already used"));
    }
    const data = {
      id,
      name,
      name_store,
      email,
      phone,
      passwordHash,
      role,
    };
    cerateSeller(data)
      .then((result) => {
        commonHelper.response(res, data, 201, "Register created");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updateCostomer: async (req, res, next) => {
    try {
      const { name, email, dateofbirth, phone, gender } = req.body;
      const id = String(req.params.id);
      const { rowCount } = await findUUID(id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const schema = Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required(),
        dateofbirth: Joi.string().required(),
        gender: Joi.string().required(),
        phone: Joi.string().min(10).max(12),
        photo: Joi.any(),
      });
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        console.log(error);
        return res.send(error.details);
      }
      let photo = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        photo = result.secure_url;
      }
      const data = {
        id,
        name,
        email,
        dateofbirth,
        phone,
        gender,
        photo,
      };
      console.log(data);
      updateUsersCostomer(data)
        .then((result) => commonHelper.response(res, data, 200, "Product updated", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  updateSeller: async (req, res, next) => {
    try {
      const { name_store, email, description, phone } = req.body;
      const id = String(req.params.id);
      const { rowCount } = await findUUID(id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const schema = Joi.object().keys({
        name_store: Joi.string().required(),
        email: Joi.string().required(),
        description: Joi.string().required(),
        phone: Joi.string().min(10).max(12),
        photo: Joi.any(),
      });
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        console.log(error);
        return res.send(error.details);
      }
      let photo = null;
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        photo = result.secure_url;
      }
      const data = {
        id,
        name_store,
        description,
        email,
        phone,
        photo,
      };

      updateUsersSeller(data)
        .then((result) => commonHelper.response(res, data, 200, "Product updated", {}))
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    const {
      rows: [user],
    } = await findEmail(email);
    if (!user) {
      return next(createError(403, "Email false"));
    }
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return next(createError(403, "password false"));
    }

    delete user.password;
    const payload = {
      email: user.email,
      role: user.role,
    };
    user.token = authHelper.generateToken(payload);
    user.refreshToken = authHelper.refershToken(payload);
    commonHelper.response(res, user, 201, "login is successful");
  },

  profile: async (req, res, next) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  refreshToken: (req, res) => {
    const refershToken = req.body.refershToken;
    const decoded = jwt.verify(refershToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refershToken: authHelper.refershToken(payload),
    };
    commonHelper.response(res, result, 200, "Refersh Token is successful");
  },
};

module.exports = usersController;
