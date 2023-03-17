const inquirer = require('inquirer')
const chalk = require('chalk')

inquirer.prompt([{
    // name: 'Nome',
    // message: 'Qual o seu nome?',
},
{
    name: 'idade',
    // message: 'Qual a sua idade?'
}]).then((resposta) => {
    const name = resposta['Nome']
    const idade = resposta.idade
    console.log(chalk.bgYellow.black(`Olá ${name}! Você tem ${idade} anos`))
}
).catch((err) => {
    console.log('Esse é o erro: ' + err)
}
)
