const {pool} = require('../database/db')
const {responseStatus} =require('../utils//response-status')


async function create(userObject) {
  try {
    const { username,phoneNumber, password, email } = userObject;
    const sql = `insert into members (username,phone_number, password, email) values (?, ?, ?, ?)`;
    const [affectedRows, insertId] = await pool.query(sql, [
      username,
      phoneNumber,
      password,
      email,
    ]);
    return { affectedRows, insertId };
  } catch (error) {
    throw new Error(responseStatus.DATABASE_CREATE_USER_ERROR.msg, error.message);
  }
}

async function read(userObject){
  try {
    const { username, phoneNumber, email } = userObject;
    let sql = `select username, phone_number, email from members where 1=1 `
    let values=[];

    if (username) {
      sql += `and username = ?`
      values.push(username);
    }

    if (phoneNumber) {
      sql += `and phone_number = ?`
      values.push(phoneNumber);
    }

    if (email) {
      sql += `and email = ? `
      values.push(email);
    }

    const [result] = await pool.query(sql, values);
    return result[0]
  } catch (error) {
    throw new Error(responseStatus.DATABASE_READ_USER_ERROR, error.message)
  }
}

async function update(userObject){

  
}


module.exports = {
  create,
  read
}