const request = require('supertest');
const app = require('../app');
const { User, Service, ServiceRequest } = require('../../db/models');

let testUser;
let testService;
let createdServiceRequest;
let testRequestWithProblem;
beforeAll(async () => {
  testUser = await User.create({
    email: 'test3@test.com',
    name: 'test3',
    phone: '111111113',
    address: 'test3',
    role: 'test',
    rut: '11111111-3',
    username: 'test3',
    password: 'test',
  });
  testService = await Service.create({
    supplierId: testUser.id,
    name: 'test',
    fee: 100,
    category: 'Mantencion',
    qualification: 4,
    description: 'requesting',
  });
  testRequestWithProblem = await ServiceRequest.create({
    userId: testUser.id,
    serviceId: testService.id,
    name: 'test',
    date: new Date(),
    state: 'problem',
  });
});

afterAll(async () => {
  if (testUser) {
    await testUser.destroy();
  }
  if (testService) {
    await testService.destroy();
  }
  if (testRequestWithProblem) {
    await testRequestWithProblem.destroy();
  }
});

describe('CREATE serviceRequest /', () => {
  it('should create a new request', async () => {
    const res = await request(app).post('/serviceRequest/').send({
      userId: testUser.id,
      serviceId: testService.id,
      name: 'test',
      date: new Date(),
      state: 'requesting',
    });
    expect(res.statusCode).toEqual(201);
    createdServiceRequest = res.body;
  });
});

describe('GET REQUEST By ID /', () => {
  it('should get a request by request id', async () => {
    const res = await request(app).get(`/serviceRequest/${createdServiceRequest.id}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should not get a request by request id, with invalid requestId', async () => {
    const res = await request(app).get('/serviceRequest/10000');
    expect(res.statusCode).toEqual(404);
  });

  // Hacer lo del token aca
});

// get all requests
describe('GET ALL REQUESTS /', () => {
  it('should get all requests', async () => {
    const res = await request(app).get('/serviceRequest/');
    expect(res.statusCode).toEqual(200);
  });

  // Hacer lo del token aca
});

// PUT request
describe('PUT REQUEST /', () => {
  it('should update a request', async () => {
    const res = await request(app).put(`/serviceRequest/${createdServiceRequest.id}`)
      .send({
        userId: testUser.id,
        serviceId: testService.id,
        name: 'test EDITED',
        date: new Date(),
        state: 'requesting',
      });
    expect(res.statusCode).toEqual(200);
  });

  // Hacer lo del token aca
});

// DELETE request
describe('DELETE REQUEST /', () => {
  it('should delete a request', async () => {
    const res = await request(app).delete(`/serviceRequest/${createdServiceRequest.id}`);
    expect(res.statusCode).toEqual(200);
  });

  it('should not delete a request, with invalid parameters', async () => {
    const res = await request(app).delete('/serviceRequest/10000');
    expect(res.statusCode).toEqual(404);
  });

  // Hacer lo del token aca
});

describe('GET REQUESTS WITH PROBLEMS /', () => {
  it('should get all requests with problems', async () => {
    const res = await request(app).get('/serviceRequest/problem');
    expect(res.statusCode).toEqual(200);
  });
});
