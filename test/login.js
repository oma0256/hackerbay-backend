const { expect } = require('chai');
const request = require('supertest');
const server = require('../server');
const messages = require('../messages/controllers/login');
const { invalidInputs } = require('../messages/index');

describe('login contoller', () => {
  let userData;
  // eslint-disable-next-line no-undef
  after(() => {
    server.close();
  });

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    userData = { username: 'oma0256', password: 'pass1234' };
  });

  it('user can login successfully', done => {
    request(server)
      .post('/login')
      .send(userData)
      .end((err, res) => {
        const {
          status,
          body,
          body: { message, username },
        } = res;
        expect(status).to.equal(200);
        expect(message).to.equal(messages.userLoggedIn);
        expect(username).to.equal(userData.username);
        expect(body).to.have.property('token');
        done();
      });
  });

  it('user cannot login without username and password', done => {
    userData = {};
    request(server)
      .post('/login')
      .send(userData)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(422);
        expect(body.message).to.equal(invalidInputs);
        expect(body).not.to.have.property('token');
        expect(body).to.have.property('errors');
        done();
      });
  });

  it('user cannot login with invalid username', done => {
    userData.username = '';
    request(server)
      .post('/login')
      .send(userData)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(422);
        expect(body.message).to.equal(invalidInputs);
        expect(body).not.to.have.property('token');
        expect(body).to.have.property('errors');
        done();
      });
  });

  it('user cannot login with invalid password', done => {
    userData.password = '';
    request(server)
      .post('/login')
      .send(userData)
      .end((err, res) => {
        const { status, body } = res;
        expect(status).to.equal(422);
        expect(body.message).to.equal(invalidInputs);
        expect(body).not.to.have.property('token');
        expect(body).to.have.property('errors');
        done();
      });
  });
});
