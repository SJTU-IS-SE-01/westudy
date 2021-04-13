const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const mysqlConfigPath = path.join(__dirname, 'mysql.json');
const mysqlConfig = JSON.parse(fs.readFileSync(mysqlConfigPath));

const pool = mysql.createPool(mysqlConfig);

class Exit {
  constructor() {
    // 是否已终止与数据库的连接
    this.exec = false;

    // windows 特判
    if (process.platform === 'win32') {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.on('SIGINT', () => {
        process.emit('SIGINT');
      });
    }

    process.on('SIGINT', () => {
      this.end(() => {
        process.exit();
      });
    });
    process.on('beforeExit', () => {
      this.end(() => {
        process.exit();
      });
    });
  }

  end(cb) {
    if (this.exex) return;
    pool.end(() => {
      console.log('SIGINT: POOL END CONNECTION');
      this.exex = true;
      if (typeof (cb) === 'function') cb();
    });
  }
}

const exit = new Exit();

module.exports = pool;
