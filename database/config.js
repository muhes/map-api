const Sequelize = require("sequelize");

const sequelize = new Sequelize("map", PROCESS.ENV.USER || 'postgres', PROCESS.ENV.PASSWORD || 'password', {host: PROCESS.ENV.HOST || 'localhost', dialect: "postgres", operators: false})

module.exports = sequelize;
 