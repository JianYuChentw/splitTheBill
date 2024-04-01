const request = require('supertest');
const app = require('../../app/app');
const { pool } = require('../../app/database/db'); // 導入資料庫連線池

const respondsResult = {
  code: '0001',
  msg: '成功。',
};

describe('POST /users/login', () => {
  it('responds with JSON', (done) => {
    request(app)
      .post('/users/login')
      .send({ username: 'user4', password: 'changePassword' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // 檢查請求體中的內容是否符合預期
        expect(respondsResult)
        done();
      });
  });

  // 測試結束後關閉資料庫連線
  afterAll(async () => {
    await pool.end();
  });
});
