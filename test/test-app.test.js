const request = require('supertest');
const app = require('../app/app');

describe('GET /addAdmin', () => {
  it('responds with "Hello World!"', async () => {
    const response = await request(app).get('/addAdmin');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
