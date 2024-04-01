const userModel = require('../../app/models/user')
const {pool} = require('../../app/database/db')
  
  const userObject1 = {
    username: 'testMan',
    phoneNumber: '0988186690',
    password: 'password999',
    email: 'testMan@example.com'
  }


describe('創建新使用者', () => {
  it('創建', async () => {
    try {
      const result = await userModel.create(userObject1);
      expect(result.affectedRows).toEqual(1);
    } catch (error) {
      throw error;
    } finally {
      await pool.end();
    }
  });
});

