const config = require('../../config');

module.exports = {
  development: {
    username: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    host: config.mysql.host,
    dialect: 'mysql',
    timezone: '+02:00',
  },
  test: {
    username: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    host: config.mysql.host,
    dialect: 'mysql',
  },
  production: {
    username: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    host: config.mysql.host,
    dialect: 'mysql',
  },
};
