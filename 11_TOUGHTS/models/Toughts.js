const {DataTypes} = require('sequelize');
const db = require('../db/conn');

// User

const Toughts = db.define('Tougth', {
    title:{
        type: DataTypes.STRING(13),
        allowNull: false,
        require: true
    } 
});


module.exports = Toughts;