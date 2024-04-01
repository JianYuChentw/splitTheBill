const userModel = require('../../app/models/user')
const {pool} = require('../../app/database/db')


const userObject1 = {
    username: 'user2',
  }
  
  const userObject2 = {
    phoneNumber: '0903456782',
    email: 'user3@example.com'
  }
  
describe('測試以條件選擇讀取使用者', () => {
  it('讀取', async () => {
    try {
      const result = await userModel.read(userObject1);
      expect(Object);
    } catch (error) {
      throw error;
    } finally {
      await pool.end();
    }
  });
});

