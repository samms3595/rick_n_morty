const characterService = require('../services/characterService');

const resolvers = {
  characters: async ({ name, status, species, gender, origin }) => {
    const filters = { name, status, species, gender, origin };
    return await characterService.findCharacters(filters);
  }
};

module.exports = resolvers;
