const Sequelize = require('sequelize');


const connection = new Sequelize('guiaperguntas', 'root', 'C@nt0930511', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;