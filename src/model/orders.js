const Pool = require("../config/db");

const selectAllOrder = ({ limit, offset, sort, sortby }) => {
  return Pool.query(` SELECT * FROM orders order by ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectOrder = (id) => {
  return Pool.query(`SELECT * FROM orders WHERE id=${id}`);
};

const selectOrderbyid = (id_user) => {
  return Pool.query(`
  SELECT orders.id, orders.qty,orders.total_price, users.id As id_users, product.id As id_product,product.name, product.photo,product.price
  FROM orders
  LEFT JOIN users ON orders.id_user = users.id
  LEFT JOIN product ON orders.id_product = product.id
  WHERE orders.id_user = '${id_user}'
  `);
};

const insertOrder = (data) => {
  const { id, address, qty, shipping, total_price, id_product, id_user } = data;
  return Pool.query(`INSERT INTO orders (address,qty,shipping ,total_price,id_product,id_user) VALUES ('${address}',${qty},'${shipping}',${total_price},${id_product},'${id_user}')`);
};

const updateOrder = (data) => {
  const { id, address, qty, shipping, total_price, id_product, id_user } = data;
  return Pool.query(`UPDATE orders SET address='${address}', qty=${qty}, shipping ='${shipping}', total_price=${total_price}, id_product=${id_product},id_user=${id_user} WHERE id=${id}`);
};

const deleteOrder = (id) => {
  return Pool.query(`DELETE FROM orders WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM orders");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM orders WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllOrder,
  selectOrder,
  selectOrderbyid,
  insertOrder,
  updateOrder,
  deleteOrder,
  countData,
  findId,
};
