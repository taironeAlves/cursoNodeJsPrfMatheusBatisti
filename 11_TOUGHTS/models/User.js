const { DataTypes } = require('sequelize');

// Conecta no banco
const db = require('../db/conn');

// Trabalha na table User
const User = db.define('user', { // sequelize cria table com nome no plural e minuscula
    // nome da coluna NAME: {atributos(string, not nul, varchar..)}

    name: {
        type: DataTypes.STRING(20), // atributo
        require: true // true = Not null, false = null
    },
    email: {
        type: DataTypes.STRING(100), // atributo
        require: true // true = Not null, false = null
    },
    senha: {
        type: DataTypes.STRING(64), // atributo
        require: true // true = Not null, false = null
    },

});

module.exports = User;