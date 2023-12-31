const request = require('supertest');
const app = require('../app');
const { User, Service, ServiceRequest } = require('../../db/models');

let testUser;
let testService;
let testRequest;
beforeAll(async () => {
  testUser = await User.create({
    email: 'test2@test.com',
    name: 'test2',
    phone: '111111112',
    address: 'test2',
    role: 'test',
    rut: '11111111-2',
    username: 'test2',
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
  testRequest = await ServiceRequest.create({
    userId: testUser.id,
    serviceId: testService.id,
    name: 'test',
    date: new Date(),
    state: 'requesting',
  });
});

afterAll(async () => {
  if (testUser) {
    try {
      await testUser.destroy();
    } catch (error) {
      console.log('error test', error);
    }
  }
  if (testService) {
    await testService.destroy();
  }
  if (testRequest) {
    await testRequest.destroy();
  }
});

describe('CREATE MESSAGE /', () => {
  it('should create a new message', async () => {
    const res = await request(app).post('/message/').send({
      serviceRequestId: testRequest.id,
      content: 'This is a message',
      senderId: testUser.id,
    });
    expect(res.statusCode).toEqual(201);
  });
});

describe('GET MESSAGE BY ID /', () => {
  it('should get a message by id', async () => {
    const res = await request(app).get(`/message/request/${testRequest.id}`);
    expect(res.statusCode).toEqual(200);
  });
});
