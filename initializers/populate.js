const axios = require('axios');
const Character = require('../models/characterSeq');
const sequelize = require('../config/database');


const populateDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    const { data } = await axios.get('https://rickandmortyapi.com/api/character');
    const characters = data.results.slice(0, 15).map(character => ({
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      origin: character.origin.name,
      image: character.image
    }));

    await Character.bulkCreate(characters);
    console.log('Database populated');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

module.exports = populateDatabase;
