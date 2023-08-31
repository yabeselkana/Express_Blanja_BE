const Pool = require("../config/db");

const selectAllAddres = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`SELECT * FROM addres order by ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectSearchAddres = (keyword) => {
  return Pool.query(`SELECT * FROM addres where name ilike '%${keyword}%' `);
};

const selectAddres = (id) => {
  return Pool.query(`SELECT * FROM addres WHERE id=${id}`);
};

const selectAddresByiduser = (id_users) => {
  return Pool.query(`SELECT * FROM addres WHERE id_users = '${id_users}' `);
};

const insertAddres = (data) => {
  const { id, emailaddress, recipientname, phone, address, postalcode, City, id_users } = data;
  return Pool.query(`INSERT INTO addres (emailaddress ,recipientname ,phone ,address,postalcode,City,id_users) VALUES('${emailaddress}','${recipientname}','${phone}','${address}','${postalcode}','${City}','${id_users}')`);
};

const updateAdres = (data) => {
  const { id, emailaddress, recipientname, phone, address, postalcode, City, id_users } = data;
  return Pool.query(`UPDATE addres SET emailaddress ='${emailaddress}',recipientname ='${recipientname}',phone='${phone}',address='${address}',postalcode='${postalcode}',City='${City}',id_users='${id_users}' WHERE id=${id}`);
};

const deleteAddres = (id) => {
  return Pool.query(`DELETE FROM addres WHERE id=${id}`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM addres");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM addres WHERE id=${id}`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllAddres,
  selectSearchAddres,
  selectAddres,
  selectAddresByiduser,
  insertAddres,
  updateAdres,
  deleteAddres,
  countData,
  findId,
};
