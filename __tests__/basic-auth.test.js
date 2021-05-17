'use strict';

const supertest = require('supertest');

require('@code-fellows/supergoose');

const server = require('../src/app.js');
const mockServer = supertest(server.app);

const base64 = require('base-64');
const bcrypt = require('bcrypt');
const router = require('../src/auth/router.js');

describe('Basic Auth Middleware',() =>{
  it('send the basic auth', async ()=>{
    let user = {username: 'Malak',password: '123'};
    await mockServer.post('/signup').send(user);

    let encoded = base64.encode('Malak:123');
    let authHeader = `Basic ${encoded}`;

    let test = await mockServer.post('/signin').set({
      Authorization: authHeader
    });

    expect(test.status).toEqual(200);
  });
  

});