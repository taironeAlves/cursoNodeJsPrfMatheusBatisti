const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// routes
const taskRoutes = require('./routes/tasksRoutes')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.use('/tasks', taskRoutes)

app.listen(3001);
