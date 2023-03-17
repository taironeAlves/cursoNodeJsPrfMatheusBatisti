const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question('Qual sua liguagem preferida ', (language) =>{
    console.log(`A minha liguam prefieraid é : ${language}`)
    readline.close()
})
