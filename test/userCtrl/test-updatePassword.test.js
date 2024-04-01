const request = require('supertest');
const app = require('../../app/app');
const { pool } = require('../../app/database/db'); // 導入資料庫連線池

const respondsResult = {
  code: '0001',
  msg: '成功。'
};

describe('PUT /users/resume', () => {
    let cookie;
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
    
  it('responds with JSON', (done) => {
    request(app)
      .put('/users/password')
      .send({ newPassword: 'newpass' })
      .set('Cookie', cookie) 
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        expect(respondsResult);
        done();
      });
  });

  // 測試結束後關閉資料庫連線
  afterAll(async () => {
    await pool.end();
  });
});
