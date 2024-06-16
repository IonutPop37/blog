const { DataTypes } = require('sequelize');
const sequelize = require('../lib/sequelize');

const Article = sequelize.define('article', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'article',
  timestamps: false,
});

module.exports = Article;
