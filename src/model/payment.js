const Pool = require("../config/db");

const selectAllPayment = ({ limit, offset, sort, sortby }) => {
  return Pool.query(` SELECT * FROM payment  order by ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectPayment = (id) => {
  return Pool.query(`SELECT * FROM payment  WHERE id=${id}`);
};

const selectPaymentbyid = (id_user) => {
  return Pool.query(`
  SELECT payment .id, payment .qty,payment .total_price, users.id As id_users, product.id As id_product,product.name, product.photo,product.price
  FROM payment 
  LEFT JOIN users ON payment .id_user = users.id
  LEFT JOIN product ON payment .id_product = product.id
  WHERE payment .id_user = '${id_user}'
  `);
};

const insertPayment = (data) => {
  const { id, qty, total_price, id_product, id_user } = data;
  return Pool.query(`INSERT INTO payment  (qty, ,total_price,id_product,id_user) VALUES (${qty},${total_price},${id_product},'${id_user}')`);
};

const updatePayment = (data) => {
  const { id, id_Addres, qty, id_shipping, total_price, id_product, id_user } = data;
  return Pool.query(`UPDATE payment  SET id_Addres='${id_Addres}', qty=${qty}, id_shipping ='${id_shipping}', total_price=${total_price}, id_product=${id_product},id_user=${id_user} WHERE id=${id}`);
};

const deletePayment = (id) => {
  return Pool.query(`DELETE FROM payment  WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM payment ");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM payment  WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllPayment,
  selectPayment,
  selectPaymentbyid,
  insertPayment,
  updatePayment,
  deletePayment,
  countData,
  findId,
};
