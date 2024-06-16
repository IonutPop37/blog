const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('blog', 'root', '', {
  host: '92.118.159.12',
  dialect: 'postgres',
  port: 26257,
  logging: console.log,
  dialectOptions: {
    ssl: false,
  },
});

module.exports = sequelize;
