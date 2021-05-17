'use strict';

require('@code-fellows/supergoose');
const supertest = require('supertest');
const { it } = require('@jest/globals');
const base64 = require('base-64');
const server = require('../src/app.js');
const mockServer = supertest(server.app);

describe('Sign Up - Sign Up Routers', ()=>{
  it('create new user' , async ()=>{
    let user = {username: "Malak", password:'123'};
    let test = await mockServer.post('/signup').send(user);

    expect(test.status).toEqual(201);
    expect(test.body.username).toEqual("Malak");
  });
  it('authenticate the log in user', async ()=>{
    let encoded = base64.encode('Malak:123');
    let authHeader = `Basic ${encoded}`;

    let test = await mockServer.post('/signin').set({Authorization: authHeader});
    expect(test.status).toEqual(200);
  });

  it('doesn\'t auth if the password is wrong' ,async ()=>{
    let encoded = base64.encode('Malak:12A3');
    let authHeader = `Basic ${encoded}`;

    let test = await mockServer.post('/signin').set({Authorization: authHeader});
    expect(test.status).toEqual(500);
  });
}); 