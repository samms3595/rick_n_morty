const Character = require('../models/characterSeq');
const cacheService = require('./cacheService');

const characterService = {
  
  findCharacters: async (filters) => {

    const validFilters = {};
    for (const key in filters) {
      if (filters[key] !== undefined) {
        validFilters[key] = filters[key];
      }
    }

    const cacheKey = `characters:${validFilters.name || ''}:${validFilters.status || ''}:${validFilters.species || ''}:${validFilters.gender || ''}:${validFilters.origin || ''}`;
    let characters = await cacheService.get(cacheKey);
    if (!characters) {
      console.log(validFilters)
      characters = await Character.findAll({ where: validFilters });
      cacheService.set(cacheKey, characters, 3600); // Cache por 1 hora
    }

    return characters;
  },
  updateCharacters: async (characters) => {
    await Character.destroy({ where: {}, truncate: true });

    const characterPromises = characters.map(character => Character.create({
      name: character.name,
      status: character.status,
      species: character.species,
      gender: character.gender,
      origin: character.origin.name,
      image: character.image
    }));

    await Promise.all(characterPromises);
  }
};

module.exports = characterService;
