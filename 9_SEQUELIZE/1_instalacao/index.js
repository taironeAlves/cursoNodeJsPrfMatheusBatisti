const express = require('express')
const exphbs = require('express-handlebars')

const conn = require('./db/conn')
const User = require('./models/User');

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))


app.get('/users/create', (req, res) =>{
  res.render('adduser');
})

app.post('/users/create', async (req, res) =>{
const name = req.body.name;
const occupation = req.body.occupation;
let newletter = req.body.newsletter;

if(newletter === 'on') {
  newletter = true;
  }

  //insert no banco de dados.
  await User.create({name, occupation, newletter});

  res.redirect('/');
 
})

app.get('/', async (req, res) => {

// select * from                  //retorn em formato de array    
const users  = await User.findAll({raw: true});

console.log(users);

  res.render('home', {users});
})

conn.sync().then(() =>{
  app.listen(4000);
}).catch((err) => console.log(err));
