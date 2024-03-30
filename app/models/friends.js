const {pool} = require('../database/db')
const responseStatus = require('../utils/response-status')



/**
 * 創建新好友關係
 * @param {object} usersObject 
 * @param {object} usersObject.uid1 使用者1
 * @param {object} usersObject.uid2 使用者2
 * @returns {Promise<{affectedRows: number, insertId: number}>} 創建好友關係結果
 */
async function create(usersObject) {
  try {
    const {uid1, uid2} = usersObject
    const sql = `insert into friends (members_id1 , members_id2 ) values(?, ?)`;
    const [{affectedRows, insertId}] = await pool.query(sql, [uid1, uid2]);
    return {affectedRows, insertId};
  } catch (error) {
    throw new Error(responseStatus.DATABASE_CREATE_FRIENDS_ERROR, error.message);
  }
}




module.exports = {
    create,
};