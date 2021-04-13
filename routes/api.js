const express = require('express');
const { query } = require('./mysql');
const pool = require('./mysql');

const router = express.Router();

function handleSQLResult(error, results, fields) {
  const json = {
    status: 0,
    msg: 'ok',
    results: {},
  };
  if (error) {
    json.status = 1;
    json.msg = error;
    console.error(error);
  } else {
    json.results = results;
  }
  return json;
}

// 查询某个楼层区域的座位信息
router.get('/seats/query', (req, res, next) => {
  pool.query('SELECT * FROM Seat WHERE ?', req.query, (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

// 查询学生信息
router.get('/students/query', (req, res, next) => {
  pool.query('SELECT Id,Name,Major,Credit FROM Student WHERE ?', req.query, (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

// 修改学生的信誉积分
router.post('/students/quary', (req, res, next) => {
  pool.query('UPDATE Student Set Credit=Credit-1  WHERE ?', req.query.Id, (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

// 增加一条座位预约
router.post('/students/addappointment', (req, res, next) => {
  pool.query('INSERT INTO SeatStatus(Btime,Etime,Snum) values("2021-04-09 21:00:00","2021-04-09 22:00:00","001") ', req.query, (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

// 查询座位预约信息 seatsapt=座位预约
router.get('/students/seatsapt', (req, res, next) => {
  pool.query('SELECT Btime,Etime,Snum,Id from SeatStatus WHERE ?', req.query, (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

module.exports = router;
