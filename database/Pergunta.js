const Sequelize = require("sequelize");
const connection = require("./database")

// Model é uma representação da sua tabela no seu codigo js.

const Pergunta = connection.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {
    console.log("Tabela criada");
})

module.exports = Pergunta;