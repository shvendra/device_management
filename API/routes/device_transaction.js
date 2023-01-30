const env = require('dotenv').config();
require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { sequelize, device_transaction } = require('../models');
const { Op } = require("sequelize");
require('https').globalAgent.options.ca = require('ssl-root-cas').create();
const app = express()
app.use(express.json())
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.use(cors());
app.options('*', cors());
app.get('/', function (req, res) {
  console.log("fsf");
  return res.send({ error: true, message: 'hello' })
  });
app.get('/devicetransactionlist', async (req, res) => {
  try {
    const devicelist = await device_transaction.findAll({order: [
      ['id', 'ASC']
  ],})
    return res.json(devicelist)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})
  module.exports = app;