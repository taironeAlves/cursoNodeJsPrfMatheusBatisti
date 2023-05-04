const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('nodemvsc2','root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

try {
    sequelize.authenticate();
    console.log('Conectamos ao MySql!');

} catch(err){
    console.log(`Não foi possível conectar: ${err}`);
}

exports.default = sequelize;