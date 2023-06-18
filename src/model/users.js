const Pool = require('../config/db')


const selectAllUsers = ({limit,offset,sort,sortby}) =>{
    return Pool.query(`SELECT * FROM users order by ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectSearchUsers = (keyword) =>{
  return Pool.query(`SELECT * FROM users where name ilike '%${keyword}%' `);
}

const selectUsers = (id) =>{
    return Pool.query(`SELECT * FROM users WHERE id=${id}`);
}

const insertUsers = (data) =>{
    const { id,	name,email,password} = data;
    return Pool.query(`INSERT INTO users (name,email,password) VALUES('${name}','${email}','${password}')`);
}

const updateUsers = (data) =>{
    const { id,name,email,password} = data;
    return Pool.query(`UPDATE users SET name ='${name}',email ='${email}' ,password ='${password}' WHERE id=${id}`);
}


const deleteUsers = (id) =>{
    return Pool.query(`DELETE FROM users WHERE id=${id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM users')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id FROM users WHERE id=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }



module.exports = {
    selectAllUsers,
    selectSearchUsers,
    selectUsers,
    insertUsers,
    updateUsers,
    deleteUsers,
    countData,
    findId
}