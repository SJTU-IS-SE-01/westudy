const assert = require('assert');
const puppeteer = require('puppeteer');
// const util = require("util");
const { exec } = require('child_process');

const timeout = (t) => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, t);
});

describe('TEST FRONTEND', function () {
  this.timeout(30000);
  let browser; let
    app;
  before(async () => {
    browser = await puppeteer.launch();
    app = exec('npm start');
    await timeout(3000);
  });

  it('redirect to /login.html', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await timeout(1000);
    await page.click('#login');
    assert.strictEqual(page.url(), 'http://localhost:3000/login.html');
  });

  it('redirect to /signup.html', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.click('#signup');
    assert.strictEqual(page.url(), 'http://localhost:3000/signup.html');
  });

  it('redirect to /appoint.html', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    await page.click('body > div:nth-child(2) > button');
    assert.strictEqual(page.url(), 'http://localhost:3000/appoint.html');
  });

  it('redirect to /appoint.html', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/header.html');
    await page.click('#navbarNav > ul > li:nth-child(1) > a');
    assert.strictEqual(page.url(), 'http://localhost:3000/appoint.html');
  });

  it('redirect to /qiandao.html', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/header.html');
    await page.click('#navbarNav > ul > li:nth-child(2) > a');
    assert.strictEqual(page.url(), 'http://localhost:3000/qiandao.html');
  });

  it('redirect to /guide.html', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/header.html');
    await page.click('#navbarNav > ul > li:nth-child(3) > a');
    assert.strictEqual(page.url(), 'http://localhost:3000/guide.html');
  });

  it('redirect to /contact.html', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/header.html');
    await page.click('#navbarNav > ul > li:nth-child(4) > a');
    assert.strictEqual(page.url(), 'http://localhost:3000/contact.html');
  });

  it('redirect to /personal.html', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/header.html');
    await page.click('#navbarNav > ul > li:nth-child(5) > a');
    assert.strictEqual(page.url(), 'http://localhost:3000/personal.html');
  });

  after(async () => {
    app.kill();
    await browser.close();
  });
});
