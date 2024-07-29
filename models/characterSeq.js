const Sequelize = require('sequelize');
const sequelize = require('../config/database.js');

const Character = sequelize.define('Character', {
    name: { type: Sequelize.STRING },
    status: { type: Sequelize.STRING },
    species: { type: Sequelize.STRING },
    gender: { type: Sequelize.STRING },
    origin: { type: Sequelize.STRING },
    image: { type: Sequelize.STRING }
  });

  module.exports = Character;
