const redis = require('../config/redis');

const cacheService = {
  get: async (key) => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  },
  set: (key, value, ttl) => {
    redis.set(key, JSON.stringify(value), 'EX', ttl);
  }
};

module.exports = cacheService;
