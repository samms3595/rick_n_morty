const axios = require('axios');
const characterService = require('../services/characterService');

const updateCharacters = async () => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    const characters = response.data.results;
    await characterService.updateCharacters(characters);
    console.log('Characters updated successfully');
  } catch (error) {
    console.error('Error updating characters:', error);
  }
};

module.exports = updateCharacters;
