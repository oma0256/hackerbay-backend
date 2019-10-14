const { expect } = require('chai');
const request = require('supertest');
const server = require('../server');
const messages = require('../messages/controllers/json-patch');
const { invalidInputs } = require('../messages/index');
const { generateToken } = require('../utils/jwt');

describe('json patch contoller', () => {
  let document;
  let patch;
  let token;
  // eslint-disable-next-line no-undef
  before(() => {
    token = generateToken({ username: 'oma0256' });
  });

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    document = '{"baz": "qux", "foo": "bar"}';
    patch =
      '[{ "op": "replace", "path": "/baz", "value": "boo" },{ "op": "add", "path": "/hello", "value": ["world"] }, { "op": "remove", "path": "/foo" }]';
  });

  // eslint-disable-next-line no-undef
  after(() => {
    server.close();
  });

  it('document patched successfully', done => {
    request(server)
      .post('/json-patch')
      .set('Authorization', `Bearer ${token}`)
      .send({ document, patch })
      .end((err, res) => {
        const {
          status,
          body,
          body: { message },
        } = res;
        expect(status).to.equal(200);
        expect(message).to.equal(messages.documentPatched);
        expect(body).to.have.property('document');
      });
    done();
  });

  it('cannot patch document when unauthenticated', done => {
    request(server)
      .post('/json-patch')
      .send({ document, patch })
      .end((err, res) => {
        const { status } = res;
        expect(status).to.equal(401);
      });
    done();
  });

  it('cannot patch document without the original document or patch', done => {
    request(server)
      .post('/json-patch')
      .set('Authorization', `Bearer ${token}`)
      .send({})
      .end((err, res) => {
        const {
          status,
          body,
          body: { message },
        } = res;
        expect(status).to.equal(422);
        expect(message).to.equal(invalidInputs);
        expect(body).not.to.have.property('document');
      });
    done();
  });
});
