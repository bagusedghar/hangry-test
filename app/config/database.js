require('dotenv').config();

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $like: Op.like,
  $not: Op.not,
  $and: Op.and,
  $or: Op.or,
  $eq: Op.eq,
  $ne: Op.ne,
  $between: Op.between,
  $gte: Op.gte,
  $lte: Op.lte,
  $gt: Op.gt,
  $lt: Op.lt,
  $in: Op.in,
  $nin: Op.notIn
}

module.exports = {
  dialect: 'postgres',
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_NAME,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  pool: {
    max: 5,
    min: 0,
    acquire: 60000,
    idle: 30000
  },
  migrationStorageTableName: 'migrations',
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: '+07:00'
  },
  timezone: '+07:00',
  operatorsAliases,
  logging: process.env.APP_DEBUG == 'true'
};
