const request = require('supertest');
const app = require('../../app/app');


const respondsResult = {
  code: '0001',
  msg: '成功。',
};


describe('POST /users/login', () => {
    it('responds with JSON', (done) => {
      request(app)
        .post('/users/login')
        .send({ username: 'user4', password: 'dsf8984894' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          // 檢查請求體中的內容是否符合預期
          expect(res.body.code).toEqual('0001');
          expect(res.body.msg).toEqual('成功。');
          done();
        });
    });
  });
  