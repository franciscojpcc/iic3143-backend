/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const request = require('supertest');
const serviceRoutes = require('../serviceRoutes');

const app = express();
app.use('/', serviceRoutes);

describe('GET /', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
