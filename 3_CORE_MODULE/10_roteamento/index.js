const http = require('http')
const fs = require('fs')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true)
  const filename = q.pathname.substring(1)

  if (filename.includes('html')) {
    // O arquivo está no mesmo diretorio por isso não passamos a path
    if (fs.existsSync(filename)) {
      fs.readFile(filename, function (err, data) {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(data)
        return res.end()
      })
    }else{
      
    }
  } 
})

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})