
var shopper_app_routes = function(app) {

	app.get('/apply', function(req, res) {
		res.render('application');
	});

	app.get('/confirm', function(req, res) {
		res.render('background');
	});

	app.post('/shopper', function(req, res) {
				//show in the console
				console.log(req.body.firstname)
				console.log(req.body.lastname)
				console.log(req.body.email)
				console.log(req.body.phone)
				console.log(req.body.zipcode)
				//save all data in session for view/edit later
				req.session.firstname = req.body.firstname;
				req.session.lastname = req.body.lastname;
				req.session.email = req.body.email;
				req.session.phone = req.body.phone;
				req.session.zipcode = req.body.zipcode;
				res.render('submitted');
	});

	app.get('/shopper', function(req, res) {

		//read from session
		var shopper = {
			firstname:req.session.firstname,
			lastname: req.session.lastname,
			email: req.session.email,
			phone: req.session.phone,
			zipcode: req.session.zipcode
		}

		//show saved session data
		res.render('edit_application', { applicant: shopper});
	});
}

module.exports = shopper_app_routes;
