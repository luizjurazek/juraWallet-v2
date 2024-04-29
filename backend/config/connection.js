const mysql = require('mysql2')
const { Sequelize } = require('sequelize')
require('dotenv').config()

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const database = process.env.DB_DATABASE;

const connection = mysql.createConnection({
    host: host,
    user: user,
    database: database
});

const sequelize = new Sequelize(database, user, '', {
    host: host,
    dialect: 'mysql'
})

module.exports = { connection, sequelize };