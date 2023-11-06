const { DataTypes } = require('sequelize');
const db = require('../db/conn');

// User
const User = require('./User');

const Toughts = db.define('tought', { // sequelize cria table com nome no plural e minuscula
    title: {
        type: DataTypes.STRING(13),
        allowNull: false,
        require: true
    }
});

Toughts.belongsTo(User);
User.hasMany(Toughts);


module.exports = Toughts;