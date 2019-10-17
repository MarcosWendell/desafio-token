require('dotenv').config();

module.exports = {
  type: 'mysql',
  host: process.env.HOST,
  port: process.env.PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ['./dist/**/*.entity.js'],
};