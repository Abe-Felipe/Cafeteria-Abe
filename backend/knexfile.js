module.exports = {
  development: {
    client: 'pg',
    connection: {
  host: '127.0.0.1',
  port: 5433,
  database: 'cafeteria_db',
  user: 'postgres',
  password: 'postgres'
},
    migrations: {
      tableName: 'knex_migrations',
      directory: './db/migrations'
    }
  }
};