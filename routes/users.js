const express = require('express');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

const emailConfigPath = path.join(__dirname, 'email.json');
const emailConfig = JSON.parse(fs.readFileSync(emailConfigPath));
const transporter = nodemailer.createTransport(emailConfig);

const router = express.Router();

const axios = require('axios');
const pool = require('./mysql');

const Emails = {};

// 生成[minNum, maxNum]之间的验证码
function randomNum(minNum, maxNum) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
}

function generateCode() {
  return randomNum(100000, 999999);
}

class Email {
  constructor(email) {
    this.email = email;
    this.code = generateCode();
  }

  sendEmail() {
    const from = emailConfig.auth.user;
    const mailOptions = {
      from,
      to: `${this.email}`,
      cc: from,
      subject: 'WeStudy 登陆验证码',
      text: `Hi!\n This is following verification code：\n${this.code}`,
    };

    // 发送邮件
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

// 生成邮箱验证码
// 需要参数
// email
router.post('/code', (req, res, next) => {
  const email = new Email(req.body.email);
  Email[email.email] = email;
  if (process.env.NODE_ENV === 'producion') {
    email.sendEmail();
  } else {
    console.log(`Email: ${email.email} Code: ${email.code}`);
  }
  res.json({
    status: 0,
    msg: 'ok',
    results: {},
  });
});

// 登陆验证
// 需要参数
// 邮箱 验证码
router.post('/signup', (req, res, next) => {
  const {
    email, code, Id, Name, Major,
  } = req.body;
  if (!Email[email] || !Email[email].code || Email[email].code.toString() !== code) {
    res.json({
      status: 1,
      msg: 'err',
      results: 'code is not correct.',
    });
  } else {
    pool.query('SELECT * from Student where Id=?', Id, (error, results, fields) => {
      if (error) {
        res.json({
          status: 1,
          msg: 'err',
          results: error,
        });
        return;
      }
      if (results.length > 0) {
        res.json({
          status: 1,
          msg: 'err',
          results: '该用户已被注册',
        });
        return;
      }
      req.session.email = email;
      res.json({
        status: 0,
        msg: 'ok',
        results: {},
      });
    });
  }
});

router.get('/getEmail', (req, res, next) => {
  if ('email' in req.session && req.session.email) {
    res.json({
      status: 0,
      msg: 'ok',
      results: { email: req.session.email },
    });
  } else {
    res.json({
      status: 1,
      msg: 'err',
      results: {},
    });
  }
});

module.exports = router;
