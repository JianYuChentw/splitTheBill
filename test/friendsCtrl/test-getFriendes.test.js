const request = require('supertest')
const app = require('../../app/app')
const {pool} = require('../../app/database/db');

const respondsData = {
  code: '0001',
  message: '成功。',
  data: [
    {
      members_id2: 13,
      username: 'user10',
      createtime: '2024/03/31 21:09:07',
      updatetime: '2024/03/31 21:09:07',
    },
  ],
};

describe('User Authentication Tests', () => {

    let cookie; // 儲存當下cookie
    // 先登入
    beforeAll((done) => {
      request(app)
        .post('/users/login') 
        .send({ username: 'tset1', password: 'ejwhiuh456' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          // 獲得cookie
          cookie = res.headers['set-cookie'];
          done();
        });
    });
  
    it('獲取', (done) => {
      request(app)
        .get('/friends/all')
        .query({approve:1})
        .set('Accept', 'application/json')
        // 使用獲得的cookie
        .set('Cookie', cookie )
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toEqual(respondsData)
          done();
        });
    });
  
    // 關閉連線
    afterAll(async () => {
      await pool.end();
    });
  });