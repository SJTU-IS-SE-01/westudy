const express = require('express');
const { query } = require('./mysql');
const pool = require('./mysql');
const { handleDate, handleSQLResult } = require('./utils');

const router = express.Router();

// 查询某个楼层区域的座位信息
router.get('/seats/query', (req, res, next) => {
  pool.query('SELECT * FROM Seat WHERE Area=? and Floor=?', [req.query.Area, req.query.Floor], (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

// 查询某段时间某个座位的状态,1表示被占，0表示未被占
router.get('/seatcheck/:Snum/:Btime/:Etime', (req, res, next) => {
  if (req.params.Etime < req.params.Btime) {
    res.json({
      status: 1,
      msg: 'Btime>Etime',
      results: {},
    });
  } else {
    pool.query('SELECT seatcheck FROM SeatStatus WHERE Snum=? AND unix_timestamp(Btime)<=unix_timestamp(?) AND unix_timestamp(Etime)>=unix_timestamp(?)   ', [req.params.Snum, req.params.Etime, req.params.Btime], (error, results, fields) => {
      const json = handleSQLResult(error, results, fields);
      if (json.results.length === 0) {
        json.results = 0;
      } else {
        json.results = 1;
      }
      res.json(json);
    });
  }
});

// 查询学生信息
router.get('/students/query', (req, res, next) => {
  pool.query('SELECT Id,Name,Major,Credit FROM Student WHERE ?', req.query, (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

// 修改学生的信誉积分
router.post('/students/quary', (req, res, next) => {
  pool.query('UPDATE Student Set Credit=Credit-1  WHERE ?', req.body, (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

// 增加一条座位预约
router.post('/students/addappointment', (req, res, next) => {
  pool.query('INSERT INTO SeatStatus(Btime,Etime,Snum,Id,Seatcheck) values(?,?,?,?,0) ',
    [req.body.Btime, req.body.Etime, req.body.Snum, req.body.Id], (error, results, fields) => {
      res.json(handleSQLResult(error, results, fields));
    });
});

// 查询某个座位所有的预约信息 seatsapt=座位预约
router.get('/students/seatsapt', (req, res, next) => {
  pool.query('SELECT Btime,Etime,Snum,Id,Seatcheck,Number from SeatStatus WHERE ? order by Btime desc', req.query, (error, results, fields) => {
    const json = handleSQLResult(error, results, fields);
    if (error) {
      res.json(json);
      return;
    }
    for (let i = 0; i < json.results.length; i += 1) {
      json.results[i].Btime = handleDate(json.results[i].Btime);
      json.results[i].Etime = handleDate(json.results[i].Etime);
    }
    res.json(json);
  });
});

// 查询某段时间内空闲的座位编号
router.get('/timecheck/:Btime/:Etime', (req, res, next) => {
  if (req.params.Etime < req.params.Btime) {
    res.json({
      status: 1,
      msg: 'Btime>Etime',
      results: {},
    });
  } else {
    pool.query('SELECT Snum FROM Seat WHERE Snum NOT IN (SELECT Snum FROM SeatStatus WHERE  unix_timestamp(Btime)<=unix_timestamp(?) AND unix_timestamp(Etime)>=unix_timestamp(?))  ', [req.params.Etime, req.params.Btime], (error, results, fields) => {
      const json = handleSQLResult(error, results, fields);
      res.json(json);
    });
  }
});

router.get('/seats/quary', (req, res, next) => {
  pool.query('SELECT * FROM Seat WHERE Snum=?', req.query.Snum, (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

router.post('/checkin', (req, res, next) => {
  pool.query('UPDATE SeatStatus Set Seatcheck=1  WHERE ?', req.body, (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

router.post('/checkout', (req, res, next) => {
  pool.query('UPDATE SeatStatus Set Seatcheck=2  WHERE ?', req.body, (error, results, fields) => {
    res.json(handleSQLResult(error, results, fields));
  });
});

module.exports = router;
