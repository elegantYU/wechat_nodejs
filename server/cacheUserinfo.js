const mysql = require('mysql'),
      querystring = require('querystring'),
      url = require('url'),
      mysqlConfig = require('../config/mysql.config');

const pool = mysql.createPool(mysqlConfig);

module.exports = {
  
}