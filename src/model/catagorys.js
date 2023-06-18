const Pool = require('../config/db')


const selectAllCatagory = ({limit,offset,sort,sortby}) =>{
    return Pool.query(`SELECT * FROM catagory order by ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectSearchCatagory = (keyword) =>{
  return Pool.query(`SELECT * FROM catagory where name ilike '%${keyword}%' `);
}

const selectCatagory = (id) =>{
    return Pool.query(`SELECT * FROM catagory WHERE id=${id}`);
}

const insertCatagory = (data) =>{
    const { id,name,image,} = data;
    return Pool.query(`INSERT INTO catagory (image,name) VALUES('${image}','${name}')`);
}

const updateCatagory = (data) =>{
    const { id,name,image,} = data;
    return Pool.query(`UPDATE catagory SET name ='${name}',image ='${image}' WHERE id=${id}`);
}


const deleteCatagory = (id) =>{
    return Pool.query(`DELETE FROM catagory WHERE id=${id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM catagory')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM catagory WHERE id=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }



module.exports = {
    selectAllCatagory,
    selectSearchCatagory,
    selectCatagory,
    insertCatagory,
    updateCatagory,
    deleteCatagory,
    countData,
    findId
}