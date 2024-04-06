const request = require('supertest')
const app = require('../../app/app')
const {pool} = require('../../app/database/db');

const respondsData = {
  code: '0001',
  message: '成功。'
};

describe('User Authentication Tests', () => {

    let cookie; // 儲存當下cookie
    // 先登入
    beforeAll((done) => {
      request(app)
        .post('/users/login') 
        .send({ username: 'user5', password: 'password5' })
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
  
    it('提出申請', (done) => {
      request(app)
        .post('/friends/new')
        .send({userName:'user9'})
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