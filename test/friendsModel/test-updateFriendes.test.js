const friendsModel = require('../../app/models/friends')
const {pool} = require('../../app/database/db');

const usersFriendsObject1 = {
  uid1: 11,
  uid2: 3,
  approve: 1,
};

describe('更新好友關係', () => {
  it('更新', async () => {
    try {
      // 呼叫Update
      const result = await friendsModel.updateFriendRelation(
        usersFriendsObject1
      );

      // 斷言
      expect(result).toEqual(0);
    } catch (error) {
      throw error;
    } finally {
      await pool.end();
    }
  });
});

