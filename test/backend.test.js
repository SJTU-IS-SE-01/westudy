const assert = require('assert');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const pool = require('../routes/mysql');

describe('TEST API', () => {
  it('/students/query', (done) => {
    request
      .get('/api/students/query?Id=519021911111')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        assert.strictEqual(res.body.status, 0);
        assert.strictEqual(res.body.msg, 'ok');
        assert.strictEqual(res.body.results[0].Id, '519021911111');
        assert.strictEqual(res.body.results[0].Name, 'John');
        assert.strictEqual(res.body.results[0].Major, 'IS');
        return done();
      });
  });
  after((done) => {
    pool.exitHelper.end(done);
  });
});
