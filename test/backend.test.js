const assert = require('assert');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);
const pool = require('../routes/mysql');

// npm run test-backend

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
  it('/students/seatsapt', (done) => {
    request
      .get('/api/students/seatsapt?Snum=001')
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
  it('/seats/query', (done) => {
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

  // 查询某时间段座位是否被占用
  it('/seatcheck/:id/:Btime/:Etime', (done) => {
    request
      .get('/api/seatcheck/001/2021-04-09 20:59:30/2021-04-10 20:59:30')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.status, 0);
        assert.strictEqual(res.body.msg, 'ok');
        assert.strictEqual(res.body.results, 1);
        return done();
      });
  });

  // 修改信誉积分
  it('/students/quary', (done) => {
    request
      .post('/api/students/quary?Id=519021911114')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.status, 0);
        assert.strictEqual(res.body.msg, 'ok');
        return done();
      });
  });

  // 增加座位预约
  it('/students/addappointment', (done) => {
    request
      .post('/api/students/addappointment?Btime=2021-04-20%2021:00:00&Etime=2021-04-20%2022:00:00&Snum=01401&Id=519021910614')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.strictEqual(res.body.status, 0);
        assert.strictEqual(res.body.msg, 'ok');
        return done();
      });
  });
  after((done) => {
    pool.exitHelper.end(done);
  });
});
