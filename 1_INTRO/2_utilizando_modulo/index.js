const fs = require('fs')

fs.readFile('arquivo1.txt', 'utf8', (err, data) => {
    if(err) {
        console.log(err)
    }
    console.log(data)
})