const {pool} = require('../database/db')
const responseStatus =require('../utils//response-status')


/**
 * 創建新使用者
 * @param {Object} userObject 
 * @param {string} userObject.username 使用者名稱
 * @param {string} userObject.phoneNumber 使用者電話號碼
 * @param {string} userObject.password 使用者密碼
 * @param {string} userObject.email 使用者電子郵件地址
 * @returns {Promise<{affectedRows: number, insertId: number}>} 創建新使用者的結果
 */
async function create(userObject) {
  try {
    const { username,phoneNumber, password, email } = userObject;
    const sql = `insert into members (username,phone_number, password, email) values (?, ?, ?, ?)`;
    const [{affectedRows, insertId}] = await pool.query(sql, [
      username,
      phoneNumber,
      password,
      email,
    ]);
    return { affectedRows, insertId };
  } catch (error) {
    console.log(error);
    throw new Error(responseStatus.DATABASE_CREATE_USER_ERROR.msg);
  }
}

/**
 * 讀取符合條件使用者資訊(可以單或多條件)
 * @param {Object} indexObject 
 * @param {string} indexObject.username 使用者名稱
 * @param {string} indexObject.phoneNumber 使用者電話號碼
 * @param {string} indexObject.email 使用者電子郵件地址
 * @returns {Promise<{ members_id: number, username: string, phone_number: string, email:string}>}
 */
async function read(indexObject) {
  try {
    const { username, phoneNumber, email } = indexObject;
    
    if (!username && !phoneNumber && !email) {
      return ;
    }
    let sql = `select 
        members_id as membersId,
        level,
        username,
        phone_number as phoneNumber,
        password,
        email,
        date_format(create_time, '%Y/%m/%d %H:%i:%s') as createtime ,
        date_format(update_time, '%Y/%m/%d %H:%i:%s') as updatetime
      from 
        members 
      where 1=1 `;
    let values = [];

    if (username) {
      sql += `and username = ?`;
      values.push(username);
    }

    if (phoneNumber) {
      sql += `and phone_number = ?`;
      values.push(phoneNumber);
    }

    if (email) {
      sql += `and email = ? `;
      values.push(email);
    }

    const [result] = await pool.query(sql, values);
    return result[0];
  } catch (error) {
    console.log(error);
    throw new Error(responseStatus.DATABASE_READ_USER_ERROR.msg);
  }
}


/**
 * 更新使用者密碼
 * @param {number} uid 使用者id 
 * @param {string} newPassword 新密碼
 * @returns {Promise<number>} 回傳異動row
 */

async function updatePassword(uid, newPassword) {
  try {
    let sql = `update members set password = ? , update_time = CURRENT_TIMESTAMP  where members_id = ?`;
    const values = [newPassword, uid] 
    const [result] = await pool.query(sql, values);
    return result.affectedRows
  } catch (error) {
    console.log(error);
    throw new Error(responseStatus.DATABASE_UPDATE_USER_ERROR.msg);
  }
}

updatePassword(5,'dijfhiuwe')


module.exports = {
  create,
  read,
  updatePassword
}