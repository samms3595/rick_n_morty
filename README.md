# Rick and Morty Character API

## Descripción

Esta es una API que proporciona información sobre personajes de la serie "Rick and Morty". La API está construida utilizando Node.js, Express, Sequelize, MySql y GraphQL. Los datos se obtienen de la API pública de Rick and Morty y se almacenan en una base de datos MySql. La API también utiliza Redis para el almacenamiento en caché de los resultados de las consultas.

## Diagrama de Entidad-Relación (ERD)

El diagrama ERD para la base de datos se muestra a continuación:

```
+------------+
| Character |
+------------+
| id | PK
| name |
| status |
| species |
| gender |
| origin |
| image |
+------------+
```


## Requisitos

- Node.js (>= 14.x)
- Mysql (>= 8.x)
- Redis (>= 5.x)

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/samms3595/rick_n_morty.git
    cd rick_n_morty
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno:

    Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido, ajustando los valores según tu configuración:

    ```env
    DB_NAME=nombre_de_tu_base_de_datos
    DB_USERNAME=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_HOST=localhost
    DB_DIALECT=mysql
    ```

4. Inicia los servicios de MySql y Redis si no están ya en ejecución.

## Ejecución

Para ejecutar la aplicación:

1. Ejecuta el servidor:

    ```bash
    npm start
    ```

2. La aplicación estará disponible en `http://localhost:4000/characters`

## Uso de la API

La API está expuesta a través de GraphQL. Puedes acceder a la interfaz GraphiQL en `http://localhost:4000/characters` para realizar consultas y explorar el esquema.

### Ejemplos de Consultas

- Obtener personajes por filtros:

    ```graphql
    query {
      characters(name: "Rick", status: "Alive", species: "Human", gender: "Male", origin: "Earth") {
        id
        name
        status
        species
        gender
        origin
        image
      }
    }
    ```

### Actualización de Datos

La aplicación incluye un job cron que actualiza los datos de los personajes cada 12 horas desde la API pública de Rick and Morty. Si deseas actualizar los datos manualmente, puedes ejecutar el siguiente script:

```bash
node src/initializers/populateDatabase.js
```

## Estructura del Proyecto

```
/src
  /config
    database.js          # Configuración de la base de datos
  /models
    characterSeq.js      # Modelo de Sequelize para Character
  /services
    characterService.js  # Servicio de personajes
  /graphql
    schema.js            # Esquema de GraphQL
    resolvers.js         # Resolvers de GraphQL
  /jobs
    updateCharacters.js  # Job para actualizar personajes
  /initializers
    populateDatabase.js  # Script para poblar la base de datos inicialmente
  app.js                 # Configuración de la aplicación Express
  server.js              # Entrada principal del servidor
.env                     # Archivo de configuración de entorno
```
## Documentación de la API

La documentación de la API está disponible en la ruta `/api-docs` una vez que el servidor está en ejecución.

Visita [http://localhost:4000/api-docs](http://localhost:4000/api-docs) para ver la documentación interactiva de Swagger.
