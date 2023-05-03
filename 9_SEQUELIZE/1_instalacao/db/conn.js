const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('nodesequelize2', 'root', '',{
  host: 'localhost',
  dialect: 'mysql'
});

try {
  
  sequelize.authenticate();
  console.log('Conectamos com sucesso acom o Sequelize!');

} catch (err) {
  console.log(0('Não foi possível conectar: ', err))
}

module.exports = sequelize;