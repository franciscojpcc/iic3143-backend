/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const request = require('supertest');
const userRoutes = require('../userRoutes');

const app = express();
app.use('/', userRoutes);


describe('POST /create', () => {
    it('responds with status 200', async () => {
        const response = await request(app).post('/create');
        expect(response.status).toBe(200);
    });
    });  

describe('GET /profile', () => {
  it('responds with status 200', async () => {
    const response = await request(app).get('/profile');
    expect(response.status).toBe(200);
  });
});
