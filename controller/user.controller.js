// Importing bcrypt for password hashing and the User model
const bcrypt = require('bcrypt');
const moment = require('moment');
const User = require('../models/user.model');
const Movie = require('../models/movie.model');

// Controller function to render the login page
const getLogin = (req, res) => {
	res.render('./users/login');
};

// Controller function to handle the login form submission
const postLogin = async (req, res) => {
	// Extracting email and password from the request body
	const { email, password } = req.body;

	try {
		// Finding a user with the provided email in the database
		const user = await User.findOne({ email });

		// Checking if the user exists and the password is correct
		if (user && (await bcrypt.compare(password, user.password))) {
			// Setting the user ID in the session and sending a success response
			req.session.userId = user._id;
			res.status(200).json(user);
		} else {
			// Sending an error response if login fails
			console.log('Failed');
			res.status(400).json({ error: 'Login failed. Please try again.' });
		}
	} catch (error) {
		// Handling errors and rendering the login page
		console.error(error);
		res.render('users/login');
	}
};

// Controller function to render the registration page
const getRegister = (req, res) => {
	res.render('./users/register');
};

// Controller function to handle the registration form submission
const postRegister = async (req, res) => {
	try {
		// Extracting data from the request body
		const data = req.body;

		// Generating a salt and hashing the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(data.password, salt);

		// Creating a new User instance with the hashed password
		const newUser = new User({
			name: data.name,
			email: data.email,
			password: hashedPassword,
			dob: data.dob,
			gender: data.gender,
			phoneNumber: data.phoneNumber,
		});

		// Saving the new user to the database and checking if it was successful
		if (await newUser.save()) {
			console.log(newUser);
			res.status(201).json(newUser);
		}
	} catch (error) {
		// Handling errors and sending an error response
		console.error(error);
		res.status(400).json({ error: 'Registration failed. Please try again.' });
	}
};

// Controller function to handle user logout
const logout = (req, res) => {
	// Destroying the session and redirecting to the home page
	req.session.destroy((err) => {
		if (err) console.error(err);
		res.redirect('/');
	});
};

const getMovie = async (req, res) => {
	try {
		const movie = await Movie.findById('65cb2a7978471f1b84cfbed4'); //Example ID
		// Format date using moment
		movie.releaseYear = moment(movie.releaseYear).format();
		res.render('./users/movie', { movie: movie, moment: moment });
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

// Exporting the controller functions
module.exports = {
	getLogin,
	postLogin,
	getRegister,
	postRegister,
	logout,
	getMovie,
};
