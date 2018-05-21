// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/fotokeeper',
    migrations: {
      directory: './db/fotokeeper'
    },
    userNullAsDefault: true
  }

};
