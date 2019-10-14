const { expect } = require('chai');
const request = require('supertest');
const server = require('../server');
const messages = require('../messages/controllers/thumbnail');
const { invalidInputs } = require('../messages/index');
const { generateToken } = require('../utils/jwt');

describe('thumbnail contoller', () => {
  let imageData;
  let token;
  // eslint-disable-next-line no-undef
  after(() => {
    server.close();
  });

  // eslint-disable-next-line no-undef
  before(() => {
    token = generateToken({ username: 'oma0256' });
  });

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    imageData = {
      imageUrl:
        'https://cnet3.cbsistatic.com/img/yjrw7VgWV7a95AvK8Ym0Np4bFXY=/1200x675/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg',
    };
  });

  it('thumbnail created successfully', done => {
    request(server)
      .post('/thumbnail')
      .set('Authorization', `Bearer ${token}`)
      .send(imageData)
      .end((err, res) => {
        const {
          status,
          body,
          body: { message },
        } = res;
        expect(status).to.equal(201);
        expect(message).to.equal(messages.thumbnailCreated);
        expect(body).to.have.property('thumbnail');
      });
    done();
  });

  it('unable to create thumbnail when unauthenticated', done => {
    request(server)
      .post('/thumbnail')
      .send(imageData)
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(401);
      });
    done();
  });

  it('unable to create thumbnail with non image url', done => {
    imageData.imageUrl = 'https://cnet3.cbsistatic.com';
    request(server)
      .post('/thumbnail')
      .set('Authorization', `Bearer ${token}`)
      .send(imageData)
      .end((err, res) => {
        const {
          status,
          body,
          body: { message },
        } = res;
        expect(status).to.equal(422);
        expect(message).to.equal(invalidInputs);
        expect(body).not.to.have.property('thumbnail');
      });
    done();
  });

  it('unable to create thumbnail withiout an image url', done => {
    imageData.imageUrl = '';
    request(server)
      .post('/thumbnail')
      .set('Authorization', `Bearer ${token}`)
      .send(imageData)
      .end((err, res) => {
        const {
          status,
          body,
          body: { message },
        } = res;
        expect(status).to.equal(422);
        expect(message).to.equal(invalidInputs);
        expect(body).not.to.have.property('thumbnail');
      });
    done();
  });

  it('unable to create thumbnail without a request body', done => {
    imageData = {};
    request(server)
      .post('/thumbnail')
      .set('Authorization', `Bearer ${token}`)
      .send(imageData)
      .end((err, res) => {
        const {
          status,
          body,
          body: { message },
        } = res;
        expect(status).to.equal(422);
        expect(message).to.equal(invalidInputs);
        expect(body).not.to.have.property('thumbnail');
      });
    done();
  });
});
