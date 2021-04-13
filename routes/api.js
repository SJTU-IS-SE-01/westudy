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

module.exports = router;
