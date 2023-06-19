const Pool = require('../config/db')


const selectAllProduct = ({limit,offset,sort,sortby}) =>{
    return Pool.query(`SELECT product.id, product.name, product.price,product.stock,product.image,product.rating,product.merek, catagory.name AS name_catagory  FROM product join catagory ON product.id_catagory = catagory.id  order by ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}


const selectSearchProduct = (keyword) =>{
  return Pool.query(`SELECT product.id, product.name, product.price,product.stock,product.image,product.rating,product.merek, catagory.name AS name_catagory  FROM product join catagory ON product.id_catagory = catagory.id  where product.name ilike '%${keyword}%' `);
}

const selectProduct = (id) =>{
    return Pool.query(`SELECT * FROM product  WHERE id=${id}`);
}

const insertProduct = (data) =>{
    const { id,name,stock,price,image,rating,merek,id_catagory} = data;
    return Pool.query(`INSERT INTO product (name,stock,price,image,rating,merek,id_catagory) VALUES('${name}',${stock},${price},'${image}','${rating}','${merek}',${id_catagory})`);
}

const updateProduct = (data) =>{
    const { id,name,price,stock,image,rating,merek,id_catagory} = data;
    return Pool.query(`UPDATE product SET name ='${name}', price=${price}, stock=${stock}, image='${image}', rating='${rating}', merek='${merek}',id_catagory = ${id_catagory} WHERE id=${id}`);
}


const deleteProduct = (id) =>{
    return Pool.query(`DELETE FROM product WHERE id=${id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM product')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM product WHERE id=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }



module.exports = {
    selectAllProduct,
    selectSearchProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countData,
    findId
}