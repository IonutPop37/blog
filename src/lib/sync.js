const sequelize = require('./sequelize');
const Article = require('../models/Article'); 

const syncModels = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
  } catch (error) {
    console.error('Unable to create tables:', error);
  }
};

syncModels();
