const Pool = require("../config/db");

const selectAllCekout = ({ limit, offset, sort, sortby }) => {
  return Pool.query(` SELECT * FROM cekout  order by ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectCekout = (id) => {
  return Pool.query(`SELECT * FROM cekout  WHERE id=${id}`);
};

const selectCekoutbyid = (id_user) => {
  return Pool.query(`
  SELECT cekout .id, cekout .qty,cekout .total_price, users.id As id_users, product.id As id_product,product.name, product.photo,product.price
  FROM cekout 
  LEFT JOIN users ON cekout .id_user = users.id
  LEFT JOIN product ON cekout .id_product = product.id
  WHERE cekout .id_user = '${id_user}'
  `);
};

const insertCekout = (data) => {
  const { id, id_Addres, qty, id_shipping, total_price, id_product, id_user } = data;
  return Pool.query(`INSERT INTO cekout  (id_Addres,qty,id_shipping ,total_price,id_product,id_user) VALUES ('${id_Addres}',${qty},${id_shipping},${total_price},${id_product},'${id_user}')`);
};

const updateCekout = (data) => {
  const { id, id_Addres, qty, id_shipping, total_price, id_product, id_user } = data;
  return Pool.query(`UPDATE cekout  SET id_Addres='${id_Addres}', qty=${qty}, id_shipping ='${id_shipping}', total_price=${total_price}, id_product=${id_product},id_user=${id_user} WHERE id=${id}`);
};

const deleteCekout = (id) => {
  return Pool.query(`DELETE FROM cekout  WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM cekout ");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM cekout  WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllCekout,
  selectCekout,
  selectCekoutbyid,
  insertCekout,
  updateCekout,
  deleteCekout,
  countData,
  findId,
};
