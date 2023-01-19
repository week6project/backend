require('dotenv').config();
const env = process.env;

const development = {
  username: env.USERNAME,
  password: env.PASSWORD,
  database: env.DATABASE,
  host: env.HOST,
  dialect: 'mysql',
  timezone: '+09:00',
  dateStrings: true,
  logging: false,
};

const test = {
  username: env.USERNAME,
  password: env.PASSWORD,
  database: env.DATABASE,
  host: env.HOST,
  dialect: 'mysql',
  timezone: '+09:00',
  dateStrings: true,
  logging: false,
};

const production = {
  username: env.USERNAME,
  password: env.PASSWORD,
  database: env.DATABASE,
  host: env.HOST,
  dialect: 'mysql',
  timezone: '+09:00',
  dateStrings: true,
  logging: false,
};

module.exports = { development, production, test };
