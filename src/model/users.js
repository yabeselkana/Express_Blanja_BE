const Pool = require("../config/db");

const selectUsers = (id) => {
  return Pool.query(`SELECT * FROM users WHERE id = '${id}'`);
};

const cerateCostomer = (data) => {
  const { id, name, email, passwordHash, role } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users (id, name, email, passwordHash, role  ) VALUES('${id}','${email}','${passwordHash}','${name}' ,'${role}')`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const cerateSeller = (data) => {
  const { id, name, email, name_store, phone, passwordHash, role } = data;
  return new Promise((resolve, reject) =>
    Pool.query(`INSERT INTO users ( id, name, email, name_store, phone, password, role) VALUES('${id}','${name}','${email}','${name_store}','${phone}','${passwordHash}' ,'${role}')`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const updateUsersCostomer = (data) => {
  const { id, name, email, dateofbirth, phone, gender, photo } = data;
  return Pool.query(`UPDATE users SET name = '${name}', email = '${email}',photo='${photo}',dateofbirth='${dateofbirth}',phone='${phone}',gender='${gender}'   WHERE id = '${id}'`);
};

const updateUsersSeller = (data) => {
  const { id, name_store, description, email, photo } = data;
  return Pool.query(`UPDATE users SET name_store = '${name_store}', description = '${description}',email = '${email}',photo='${photo}' WHERE id = '${id}'`);
};

const findUUID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE id= '${id}' `, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};
const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE email = '${email}' `, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectUsers,
  cerateCostomer,
  cerateSeller,
  updateUsersCostomer,
  updateUsersSeller,
  findEmail,
  findUUID,
};
