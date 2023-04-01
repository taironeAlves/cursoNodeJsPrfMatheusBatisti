const express = require('express');
const app = express();
const port = 5000
const path = require('path');
const localPath = path.join(__dirname, 'templates');
const info = require('./info'); 

app.use(express.static('./public'));

app.use('/info', info)

app.get('/', (req, res) =>{
    res.sendFile(`${localPath}/index.html`);
});

app.listen(port, () =>{
    console.log('estou rodando na porta ' + port)
})