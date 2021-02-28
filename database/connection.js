const { Sequelize } = require("sequelize"); 

const sequelize = new Sequelize("avital_test_v2", "root", "", {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;