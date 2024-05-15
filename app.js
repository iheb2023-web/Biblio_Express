//declaration
var express = require('express');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
const mysql = require('mysql');//pour mysql
var app = express();
var port = 3000;

//common controllers
var signup = require('./controllers/signup');
var login = require('./controllers/login');
var logout = require('./controllers/logout');

//admin controllers
var admin = require('./controllers/admin');


//customer controllers
var customer = require('./controllers/customer');

//configure
app.set('view engine', 'ejs');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({secret: 'my top secret pass', resave: false, saveUninitialized: true}));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));

// Connection à la base de données MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'library_management_system' // Nom de votre base de données
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
        return;
    }
    console.log('Connecté à MySQL avec succès !');
});

app.use('*', function(req, res, next){

	if(req.originalUrl == '/login' || req.originalUrl == '/signup')
	{
		next();
	}
	else
	{
		if(!req.session.admin && !req.session.customer)
		{
			res.redirect('/login');
			return;
		}
		next();
	}
});


//routes
app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);

//admin routes
app.use('/admin', admin);


//customer routes

app.use('/customer', customer);

//server start
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
