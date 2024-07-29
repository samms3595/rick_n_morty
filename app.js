const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const sequelize = require('./config/database');

const app = express();
const populateDatabase = require('./initializers/populate');


// Sincronizar modelos de Sequelize con la base de datos y poblarla
sequelize.sync().then(async () => {
  console.log('Database & tables created!');
  await populateDatabase();
}).catch(err => {
  console.error('Error syncing database:', err);
});


/**
 * @swagger
 * tags:
 *   name: Characters
 *   description: Rick and Morty characters
 */

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Returns a list of characters
 *     tags: [Characters]
 *     responses:
 *       200:
 *         description: The list of characters
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Character'
 */

// Middleware de GraphQL
app.use('/characters', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}));

// Middleware para imprimir información relevante
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

module.exports = app;
