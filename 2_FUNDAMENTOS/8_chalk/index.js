const chalk = require('chalk')

const nota = 6
if (nota >= 7) {
    console.log(chalk.green('parabéns Você passou de ano!'))
} else {
    console.log(chalk.bgRed('Você foi reprovado'))
}