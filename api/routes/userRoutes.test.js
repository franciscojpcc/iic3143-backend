const request = require('supertest');
const app = require('../app');

describe('USER /create', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/user/create').send({
      email: 'test@test.com',
      name: 'test',
      phone: '111111111',
      address: 'test',
      role: 'test',
      rut: '11111111-1',
      username: 'test',
      password: 'test',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('access_token');
  });
});
