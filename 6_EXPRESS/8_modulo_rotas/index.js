const express = require('express')

const app = express()
const port = 3000
const path = require('path')

const basePath = path.join(__dirname, 'templates')
const userRouter = require('./users')
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

// Arquivos estáticos
app.use(express.static('public'))

app.use('/users', userRouter)
app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)
})

app.use(function (req, res){
 res.status(404).sendFile(`${basePath}/404.html`)
})

app.listen(port, () => {
    console.log(`App rodando na porta ${port} `)
})
