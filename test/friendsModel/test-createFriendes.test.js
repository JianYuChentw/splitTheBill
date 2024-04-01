const friendsModel = require('../../app/models/friends')
const {pool} = require('../../app/database/db');


// 測試關係物件
const userObject1 ={uid1:3, uid2:13, approve:2}



describe('創建好友函式', () => {
    // 測試案例
    it('創建', async () => {
      try {
        // 呼叫函式獲取加為好友
        const result = await friendsModel.create(userObject1);
        // 斷言返回的結果是否符合預期
        expect(result.affectedRows).toEqual(1);
      } catch (error) {
        // 捕獲錯誤並拋出
        throw error;
      } finally {
        // 確保無論測試結果如何，都釋放資料庫連線
        await pool.end();
      }
    });
  });


