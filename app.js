var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(session({secret: 'nahid'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var shopper_app_routes = require('./controllers/shopper_application.js')(app);

app.get('/', function (req, res) {
	if (req.session.email) {
		return res.redirect('/shopper?email=' + req.session.email);
	}
  	res.render('index');
});

app.set('view engine', 'ejs');

app.listen(8080, function () {
 	console.log('Listening on port 8080!');
});
