const friendsModel = require('../../app/models/friends')
const {pool} = require('../../app/database/db');

describe('getUserFriends function', () => {
  // 測試案例
  it('should return user friends data', async () => {
    try {
      // 呼叫函式獲取好友資料
      const result = await friendsModel.getUserFriends({ uid1: 3, approve: 1 });
      // 斷言返回的結果是否符合預期
      expect(result).toEqual([
        {
          members_id2: 12,
          username: 'user7',
          createtime: '2024/03/30 15:34:37',
          updatetime: null
        },
        {
          members_id2: 11,
          username: 'user1',
          createtime: '2024/03/30 15:44:49',
          updatetime: null
        }
      ]);
    } catch (error) {
      // 捕獲錯誤並拋出
      throw error;
    } finally {
      // 確保無論測試結果如何，都釋放資料庫連線
      await pool.end();
    }
  });
});
