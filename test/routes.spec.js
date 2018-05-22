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
    it('POST a photo', (done) => {
      chai.request(app)
      .post('/api/v1/photos').send({
          name: 'XTREME',
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcNvWTfy4cPvBxTwOa-bONMqdds2crsrn5UMmSjpnprZ9RurfE4Q'
      })
      .end((error, response) => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.an('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(3);
        done();
      });
    });

    it('should not POST a new photo if name is blank', (done) => {
      chai.request(app)
      .post('/api/v1/photos').send({
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcNvWTfy4cPvBxTwOa-bONMqdds2crsrn5UMmSjpnprZ9RurfE4Q'
      })
      .end((error, response) => {
        response.should.have.status(422)
        response.body.should.deep.equal({ error: 'Missing data' });
        done();
      });
    });

    it('should not POST a new photo if url is blank', (done) => {
      chai.request(app)
      .post('/api/v1/photos').send({
        name: 'XTREME'
      })
      .end((error, response) => {
        response.should.have.status(422)
        response.body.should.deep.equal({ error: 'Missing data' });
        done();
      });
    });
  });

  describe('DELETE', () => {
    it('DELETE a photo with an id', (done) => {
      chai.request(app)
      .delete('/api/v1/photos/2')
      .end((error, response) => {
        response.should.have.status(200)
        done();
      });
    });

    it('should not DELETE a photo if ID does not exist', (done) => {
      chai.request(app)
      .delete('/api/v1/photos/3000')
      .end((error, response) => {
        response.should.have.status(404)
        done();
      });
    });
  });
});