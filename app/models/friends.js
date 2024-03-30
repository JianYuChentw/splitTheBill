const { pool } = require('../database/db');
const responseStatus = require('../utils/response-status');

/**
 * 創建新好友關係
 * @param {object} usersObject
 * @param {object} usersObject.uid1 使用者1
 * @param {object} usersObject.uid2 使用者2
 * @param {object} usersObject.approve 核准狀態 0:解除, 1:好友, 2:已申請, 3:待回覆
 * @returns {Promise<{affectedRows: number, insertId: number}>} 創建好友關係結果
 */
async function create(usersObject) {
  try {
    const { uid1, uid2, approve } = usersObject;
    const sql = `insert into friends (members_id1 , members_id2, approve ) values(?, ?, ?)`;
    const [{ affectedRows, insertId }] = await pool.query(sql, [
      uid1,
      uid2,
      approve,
    ]);
    return { affectedRows, insertId };
  } catch (error) {
    throw new Error(
      responseStatus.DATABASE_CREATE_FRIENDS_ERROR,
      error.message
    );
  }
}

/**
 * 取得使用者所有好友
 * @param {object} usersFriendsObject
 * @param {number} usersFriendsObject.users1  使用者1
 * @param {number} usersFriendsObject.approve 0:解除, 1:好友, 2:已申請, 3:待回覆
 * @returns {Promise<[]>}
 */
async function getUserFriends(usersFriendsObject) {
  try {
    const { users1, approve } = usersFriendsObject;
    const sql = `select f.members_id2, m.username 
        from friends f 
        join members m on f.members_id2 = m.members_id 
        where 
        f.members_id1 = ? and f.approve = ?`;

    const [result] = await pool.query(sql, [users1, approve]);
    return result;
  } catch (error) {
    throw new Error(responseStatus.DATABASE_GET_FRIENDS_ERROR, error.message);
  }
}


/**
 * 更新好友關係
 * @param {object} usersFriendsObject
 * @param {number} usersFriendsObject.users1  使用者1
 * @param {number} usersFriendsObject.approve 0:解除, 1:好友, 2:已申請, 3:待回覆
 */
async function updateFriendRelation(users2) {}

module.exports = {
  create,
  getUserFriends,
};
