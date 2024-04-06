const { pool } = require('../database/db');
const responseStatus = require('../utils/response-status');
const AppError = require('../utils/handleError');


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
    console.log(error);
    throw new AppError(responseStatus.DATABASE_CREATE_FRIENDS_ERROR);
  }
}

/**
 * 取得使用者所有好友
 * @param {object} usersFriendsObject
 * @param {number} usersFriendsObject.users1  使用者1
 * @param {number} usersFriendsObject.approve 0:解除, 1:好友, 2:已申請, 3:待回覆
 * @returns {Promise<Array<{members_id2: number, username: string}>>}
 */
async function getUserFriends(usersFriendsObject) {
  try {
    const { uid1, approve } = usersFriendsObject;

    let condition = [uid1];

    let sql = `
    select 
      f.members_id2, 
      m.username ,
      approve ,
      date_format(f.create_time, '%Y/%m/%d %H:%i:%s') as createtime ,
      date_format(f.update_time, '%Y/%m/%d %H:%i:%s') as updatetime
    from 
      friends f 
    join 
        members m on f.members_id2 = m.members_id 
    where 
        f.members_id1 = ? `;

    if (approve) {
      sql += `and f.approve = ?`;
      condition.push(approve);
    }

    const [result] = await pool.query(sql, condition);
    return result;
  } catch (error) {
    console.log(error);
    throw new AppError(responseStatus.DATABASE_GET_FRIENDS_ERROR);
  }
}


/**
 * 更新好友關係
 * @param {object} usersFriendsObject
 * @param {number} usersFriendsObject.uid1  使用者1
 * @param {number} usersFriendsObject.uid1  使用者2
 * @param {number} usersFriendsObject.approve 0:解除, 1:好友, 2:已申請, 3:待回覆
 * @returns {Promise<number>} 回傳異動行數
 */
async function updateFriendRelation(usersFriendsObject) {
    try {
        const {uid1, uid2, approve} = usersFriendsObject
        const sql = `update friends  set approve = ? , update_time = CURRENT_TIMESTAMP  where members_id1 = ? and members_id2 = ?`
        const [result] = await pool.query(sql,[approve, uid1, uid2 ])
        return result.changedRows
    } catch (error) {
        console.log(error);
        throw new AppError(responseStatus.DATABASE_UPDATE_FRIENDS_ERROR);
    }
}



/**
 * 條件尋找指定好友
 * @param {object} usersFriendsObject 
 * @param {number} usersFriendsObject.uid1 使用者1
 * @param {number} usersFriendsObject.uid2 使用者2
 * @param {number} usersFriendsObject.approve 0:解除, 1:好友, 2:已申請, 3:待回覆
 */
async function findFriend(usersFriendsObject) {
  try {
    const { uid1, uid2, approve = 1 } = usersFriendsObject;
    let condition = [uid1, uid2];
    let sql = `
      select 
        members_id1, 
        members_id2, 
        approve, 
        date_format(create_time, '%Y/%m/%d %H:%i:%s') as createtime ,
        date_format(update_time, '%Y/%m/%d %H:%i:%s') as updatetime
      from 
        friends 
      where  
        members_id1= ? and members_id2= ?`;
    if (approve>1) {
      sql += ` and approve = ?`
      condition.push(approve);
    }
    const [result] = await pool.query(sql,condition);
    console.log(result);
    return result
  } catch (error) {
    console.log(error);
    throw new AppError(responseStatus.DATABASE_GET_FRIENDS_ERROR);
  }
}




module.exports = {
  create,
  getUserFriends,
  updateFriendRelation
};
