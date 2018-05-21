const chai = require('chai');
const should = chai.should();
const app = require('../server.js');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const chaiHttp = require('chai-http');

chai.use(chaiHttp);


describe('Testing endpoints', () => {
  beforeEach(done => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        database.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  describe('GET', () => {
    it('GET all photos', (done) => {
      chai.request(app)
      .get('/api/v1/photos')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.an('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('url');
        response.body[0].should.have.property('created_at');
        response.body[0].should.have.property('updated_at');
        response.body[0].name.should.equal('Adventure1');
      done();
      });
    });

    it('should throw a 404 if photo does not exist', (done) => {
      chai.request(app)
      .get('/api/v1/phosphorus')
      .end((error, response) => {
        response.should.have.status(404);
      done();
      });
    });
  });

  describe('POST', () => {
    it('POST photo', (done) => {
      chai.request(app)
      
    });
  });

});