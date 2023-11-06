const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const fileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');

// Models
const Toughts = require('./models/Toughts');

// template engine
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({ // express.urlencoded é usado para analisar os dados do formulário enviados por meio de uma solicitação POST
        extended: true // Observe que a opção extended é definida como true. Isso permite que você analise dados de formulário mais complexos, como arrays e objetos, se necessário.
    })
);

// Antigamente era usado o body-parser que entendia varios tipos de envio de formulario como json e form-data, porém, ele foi abandonado e está obsoleto
// o express usa de forma individual midleware que interpretam esses tipos de forms como urlencoded e express.json;

app.use(express.json());

// Session salvo em arquivo.
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new fileStore({
            logFn: function () { },
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 360000,
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// flash messages
app.use(flash());

// public path
app.use(express.static('public'))

// set session to res
app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
})

conn.sync().then(() => {
    app.listen(3000)
}).catch((err) => console.log(err))