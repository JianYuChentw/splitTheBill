const request = require('supertest');
const app = require('../../app/app');
const { pool } = require('../../app/database/db'); // 導入資料庫連線池

const respondsResult = {
  code: '0001',
  msg: '成功。',
  data: {
    level: 0,
    username: 'user4',
    email: 'user4@example.com',
    createtime: '2024/03/29 20:03:36',
    updatetime: '2024/04/01 16:45:12',
  },
};

describe('User Authentication Tests', () => {
  let cookie; // 儲存當下cookie
  // 先登入
  beforeAll((done) => {
    request(app)
      .post('/users/login') 
      .send({ username: 'user4', password: 'newpass' })
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

  it('should update user password', (done) => {
    request(app)
      .get('/users/resume')
      .set('Accept', 'application/json')
      // 使用獲得的cookie
      .set('Cookie', cookie) 
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toEqual(respondsResult);
        done();
      });
  });

  // 關閉連線
  afterAll(async () => {
    await pool.end();
  });
});