const assert = require('assert');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const pool = require('../routes/mysql');

describe('TEST API', () => {
  // 查询学生信息
  it('/students/query', (done) => {
    request
      .get('/api/students/query?Id=519021911111')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.status, 0);
        assert.strictEqual(res.body.msg, 'ok');
        assert.strictEqual(res.body.results[0].Id, '519021911111');
        assert.strictEqual(res.body.results[0].Name, 'John');
        assert.strictEqual(res.body.results[0].Major, 'IS');
        return done();
      });
  });

  // 查询座位预约信息
  it('/students/query', (done) => {
    request
      .get('/api/students/seatsapt?Snum=01301')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.status, 0);
        assert.strictEqual(res.body.msg, 'ok');
        return done();
      });
  });

  // 查询座位信息
  it('/students/query', (done) => {
    request
      .get('/api/seats/query?Snum=01301')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.status, 0);
        assert.strictEqual(res.body.msg, 'ok');
        assert.strictEqual(res.body.results[0].Subject, '高等数学');
        assert.strictEqual(res.body.results[0].Snum, '01301');
        assert.strictEqual(res.body.results[0].Area, 'A');
        assert.strictEqual(res.body.results[0].Floor, '3');
        return done();
      });
  });
 
  after((done) => {
    pool.exitHelper.end(done);
  });
});
