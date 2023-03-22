//Modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// modulos internos
const fs = require('fs')
operation()

function operation() {
    inquirer.prompt([{
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
            'Criar Conta',
            'Consultar Saldo',
            'Depositar',
            'Sacar',
            'Sair',
        ],
    },]).then(answer => {
        const action = answer['action']
        if (action == 'Criar Conta') {
            createAccount()
        } else if (action === 'Depositar') {
            deposit()
        } else if (action === 'Consultar Saldo') {
            getAccountBalance()
        } else if (action === 'Sacar') {
            withDraw()
        } else if (action === 'Sair') {
            console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
            process.exit()
        }
    }).catch((err) => console.log(err))
}

// create an account
function createAccount() {
    console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'))
    console.log(chalk.green('Defian as opções da sua conta a seguir'))

    buildAccount()
}


function buildAccount() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digtei um nome para a sua conta',
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        console.log(accountName)

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('esta conta já existe, escolha outro nome!'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance":0}', (err) => {
            console.log(err)
        },)

        console.log(chalk.green('Parabéns, a sua conta foi criada!'))
        operation()


    }).catch((err) => console.log(err))
}


// add an amount to user account
function deposit() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta'
    }]).then((answer) => {
        const accountName = answer['accountName']

        //verify if account exists
        if (!checkAccount(accountName)) {
            return deposit()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja depositar?'
        }]).then((answer) => {
            const amount = answer['amount']

            // add an amount
            addAmount(accountName, amount)

        }).catch((err) => console.log(err))

    }).catch((err) => console.log(err))
}


function checkAccount(accountName) {

    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('esta conta não existe, escolha outro nome!'))
        return false
    } else {
        return true
    }
}


function addAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    //caso não coloque nenhum valor no amount
    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente!'))
        operation()
    }
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err) => console.log(err))
    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta`))
    operation()
}


function getAccount(accountName) {
    const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })

    return JSON.parse(accountJson)
}


// show account balance

function getAccountBalance() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return getAccountBalance()
        }

        const accountData = getAccount(accountName)
        console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é de R$${accountData.balance}`))
        operation()

    }).catch((err) => console.log(err))
}


//withdraw an amount from user account
function withDraw() {
    inquirer.prompt([{
        name: 'accountName',
        message: 'Qual o nome da sua conta?'
    }]).then((answer) => {
        const accountName = answer['accountName']

        if (!checkAccount(accountName)) {
            return withDraw()
        }

        inquirer.prompt([{
            name: 'amount',
            message: 'Quanto você deseja sacar?'
        }]).then((answer) => {
            const amount = answer['amount']

            removeAmount(accountName, amount)
          

        }).catch((err) => console.log(err))
    }).catch((err) => console.log(err))
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return withDraw()
    }

    if (accountData.balance < amount) {
        console.log(chalk.bgRed.black('Valor indisponível!'))
        return withDraw()
    }

    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), (err) => console.log(err))

    console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`))
     return operation()
}