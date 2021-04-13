const express = require('express');
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

// 查询座位的状态,1表示被占，0表示未被占
router.get('/seatcheck/:id/:Btime/:Etime', (req, res, next) => {
  if (req.params.Etime < req.params.Btime) {
    res.json({
      status: 1,
      msg: 'Btime>Etime',
      results: {},
    });
  } else {
    pool.query('SELECT seatcheck FROM SeatStatus WHERE Snum=? AND unix_timestamp(Btime)<=unix_timestamp(?) AND unix_timestamp(Etime)>=unix_timestamp(?)   ', [req.params.id, req.params.Etime, req.params.Btime], (error, results, fields) => {
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

module.exports = router;
