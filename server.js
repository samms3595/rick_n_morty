const app = require('./app.js');
const cron = require('node-cron');
const updateCharacters = require('./jobs/updateCharacters');
const swaggerConfig = require('./config/swagger');


// Configurar el cron job para que se ejecute cada 12 horas
cron.schedule('0 */12 * * *', updateCharacters);


swaggerConfig(app);


// Iniciar el servidor
app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
    console.log('Swagger docs available at http://localhost:4000/api-docs');
  });
