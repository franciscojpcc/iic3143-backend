const request = require('supertest');
const app = require('../app');

describe('POST user/create', () => {
  // Test for creating a new user
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

  // Test for creating a user that already exists
  it('should return an error if the user already exists', async () => {
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
    expect(res.statusCode).toEqual(409);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('User already exists');
  });
});

describe('GET user/profile', () => {
  // Test for getting a user profile
  it('should return the user profile', async () => {
    const response = await request(app).post('/user/create').send({
      email: 'testget@test.com',
      name: 'testget',
      phone: 'getphone',
      address: 'testget',
      role: 'testget',
      rut: 'getrut',
      username: 'testget',
      password: 'testget',
    });
    const token = response.body.access_token;
    const res = await request(app).get('/user/profile?username=testget').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('info');
  });

  // Test for getting a user profile that doesn't exist
  it('should return an error if the user does not exist', async () => {
    const response = await request(app).post('/user/create').send({
      email: 'testget2@test.com',
      name: 'testget2',
      phone: 'getphone2',
      address: 'testget2',
      role: 'testget2',
      rut: 'getrut2',
      username: 'testget2',
      password: 'testget2',
    });
    const token = response.body.access_token;
    const res = await request(app).get('/user/profile?username=test2').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('User not found');
  });
});

describe('PUT user/profile', () => {
  // Test for updating a user profile
  it('should update the user profile', async () => {
    const response = await request(app).post('/user/create').send({
      email: 'testput@test.com',
      name: 'testput',
      phone: 'putphone',
      address: 'testput',
      role: 'testput',
      rut: 'putrut',
      username: 'testput',
      password: 'testput',
    });
    const token = response.body.access_token;
    const res = await request(app).put('/user/profile?username=testput').send({
      username: 'updated test',
      email: 'updatedtest@gmail.com',
    }).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('info');
  });

  // Test for updating a user profile that doesn't exist
  it('should return an error if the user does not exist', async () => {
    const response = await request(app).post('/user/create').send({
      email: 'testput2@test.com',
      name: 'testput2',
      phone: 'putphone2',
      address: 'testput2',
      role: 'testput2',
      rut: 'putrut2',
      username: 'testput2',
      password: 'testput2',
    });
    const token = response.body.access_token;
    const res = await request(app).put('/user/profile?username=test2').send({
      username: 'updated test2',
      email: 'updatedtest2@gmail.com',
    }).set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('User not found');
  });
});

describe('DELETE user/profile', () => {
  // Test for deleting a user profile
  it('should delete the user profile', async () => {
    const response = await request(app).post('/user/create').send({
      email: 'testdelete@test.com',
      name: 'testdelete',
      phone: 'deletephone',
      address: 'testdelete',
      role: 'testdelete',
      rut: 'deleterut',
      username: 'testdelete',
      password: 'testdelete',
    });
    const token = response.body.access_token;
    const res = await request(app).delete('/user/profile?username=testdelete').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('User deleted');
  });

  // Test for deleting a user profile that doesn't exist
  it('should return an error if the user does not exist', async () => {
    const response = await request(app).post('/user/create').send({
      email: 'testdelete@test.com',
      name: 'testdelete',
      phone: 'deletephone',
      address: 'testdelete',
      role: 'testdelete',
      rut: 'deleterut',
      username: 'testdelete',
      password: 'testdelete',
    });
    const token = response.body.access_token;
    const res = await request(app).delete('/user/profile?username=test2').set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toEqual('User not found');
  });
});
