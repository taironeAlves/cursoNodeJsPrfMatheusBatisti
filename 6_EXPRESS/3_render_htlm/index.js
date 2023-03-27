const express = require('express')

const app = express()
const port = 3000
const path = require('path')

const basePath = path.join(__dirname, 'templates')

app.get('/users/:id', (req, res) => {
    const id = req.params.id

    console.log(`Estamos buscando o usuario ${id}`)

    res.sendFile(`${basePath}/user.html`)
})



app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)
})


app.listen(port, () => {
    console.log(`App rodando na porta ${port} `)
})

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userForm.html`)
})

app.post('/users/save', (req, res) => {

})