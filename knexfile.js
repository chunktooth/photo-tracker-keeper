// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/fotokeeper',
    migrations: {
      directory: './db/fotokeeper'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    userNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/fotokeeper_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },
  
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  }
};
