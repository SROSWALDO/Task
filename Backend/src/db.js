const { Sequelize } = require("sequelize");
require("dotenv").config();

// Modelo
const TaskModel = require("./models/Task");

// Connection
const { DB_USER, DB_PASSWORD, DB_HOST, DATABASE } = process.env;

const sequelize = new Sequelize(
    `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DATABASE}`,
    { logging: false, native: false }
);

TaskModel(sequelize);


module.exports = {
    ...sequelize.models,
    connection: sequelize,
};