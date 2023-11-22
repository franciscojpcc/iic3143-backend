const request = require('supertest');
const app = require('../app');
const { User } = require('../../db/models');

let testUser;
let createdService;
beforeAll(async () => {
  testUser = await User.create({
    email: 'test4@test.com',
    name: 'test4',
    phone: '111111114',
    address: 'test4',
    role: 'test',
    rut: '11111111-4',
    username: 'test4',
    password: 'test4',
  });
});

afterAll(async () => {
  if (testUser) {
    await testUser.destroy();
  }
});

describe('CREATE services /', () => {
  it('should create a new service', async () => {
    const res = await request(app).post('/services/').send({
      supplierId: testUser.id,
      name: 'test',
      fee: 100,
      category: 'Mantencion',
      qualification: 4,
      description: 'requesting',
    });
    expect(res.statusCode).toEqual(201);
    createdService = res.body;
  });
});

describe('GET service By ID /', () => {
  it('should get a service by id', async () => {
    const res = await request(app).get(`/services/${createdService.id}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should not get a service by id, with invalid id', async () => {
    const res = await request(app).get('/services/10000');
    expect(res.statusCode).toEqual(404);
  });

  // Hacer lo del token aca
});

// get all requests
describe('GET ALL SERVICES /', () => {
  it('should get all services', async () => {
    const res = await request(app).get('/services/');
    expect(res.statusCode).toEqual(200);
  });

  // Hacer lo del token aca
});

// PUT service
describe('PUT SERVICE /', () => {
  it('should update a service', async () => {
    const res = await request(app).put(`/services/${createdService.id}`).send({
      supplierId: testUser.id,
      name: 'test EDITED',
      fee: 100,
      category: 'Mantencion',
      qualification: 4,
      description: 'requesting',
    });
    expect(res.statusCode).toEqual(200);
  });

  // Hacer lo del token aca
});

// DELETE service
describe('DELETE SERVICE /', () => {
  it('should delete a service', async () => {
    const res = await request(app).delete(`/services/${createdService.id}`);
    expect(res.statusCode).toEqual(200);
  });

  // Hacer lo del token aca
});
