const Pool = require('../config/db')


const selectAllOrder = ({limit,offset,sort,sortby}) =>{
    return Pool.query(`SELECT orders.id,orders.date,orders.address,orders.qty,orders.shiping,orders.total_price, product.name AS name_product, users.name FROM orders join product ON orders.id_product = product.id join users ON orders.id_user = users.id order by ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectOrder = (id) =>{
    return Pool.query(`SELECT * FROM orders WHERE id=${id}`);
}

const insertOrder = (data) =>{
    const { id,date,address,qty,shiping,total_price,id_product,id_user} = data;
    return Pool.query(`INSERT INTO orders (date,address,qty,shiping,total_price,id_product,id_user) VALUES ('${date}','${address}',${qty},'${shiping}',${total_price},${id_product},${id_user})`);
}

const updateOrder = (data) =>{
    const {  id,date,address,qty,shiping,total_price,id_product,id_user} = data;
    return Pool.query(`UPDATE orders SET date ='${date}', address='${address}', qty=${qty}, shiping='${shiping}', total_price=${total_price}, id_product=${id_product},id_user=${id_user} WHERE id=${id}`);
}


const deleteOrder = (id) =>{
    return Pool.query(`DELETE FROM orders WHERE id=${id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM orders')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM orders WHERE id=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }



module.exports = {
    selectAllOrder,
    selectOrder,
    insertOrder,
    updateOrder,
    deleteOrder,
    countData,
    findId
}