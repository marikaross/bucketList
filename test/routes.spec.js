process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');

chai.use(chaiHttp);

describe('api endpoints', () => {
  beforeEach( done => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() =>{
          done()
        })
      })
    })
  })
  
  describe('GET to /api/v1/list_items', () => {
    it('should return all list_items', done => {
      chai.request(server)
      .get('/api.v1/list_items')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('title');
        response.body[0].title.should.equal('Australia');
        response.body[0].should.have.property('description');
        response.body[0].description.should.equal('Go see a platypus in person');
        response.body[0].should.have.property('id');
        response.body[0].id.should.equal(1);
        done()
      })
    })

    it('should return a 404 for a route that does not exist', done => {
      chai.request(server)
      .get('/sad')
      .end((err, response) => {
        response.should.have.status(404);
      done()
      })
  })
  })
})