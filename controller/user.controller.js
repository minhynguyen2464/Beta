// Importing bcrypt for password hashing and the User model
const bcrypt = require('bcrypt');
const moment = require('moment');
const area = require('area-vn');
const User = require('../models/user.model');
const Movie = require('../models/movie.model');
const Booking = require('../models/booking.model')

// Controller function to render the login page
const getLogin = (req, res) => {
	res.render('./users/login');
};


const loginValidate = (email,password)=>{
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const passwordRegex = /^[^<>]{6,}$/;
	if(!emailRegex.test(email)){
		return 'Email không hợp lệ';
	}
	if(!passwordRegex.test(password)){
		return 'Password không hợp lệ'
	}
	return null;
}

// Controller function to handle the login form submission
const postLogin = async (req, res) => {
	// Extracting email and password from the request body
	const { email, password } = req.body;
	const validationError  = loginValidate(email,password);
	if(validationError){
		res.status(400).json({error: validationError})
	}
	else{
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
				res.status(400).json({ error: 'Login failed. Please try again.' });
			}
		} catch (error) {
			// Handling errors and rendering the login page
			console.error(error);
			res.render('users/login');
		}
	}
};

// Controller function to render the registration page
const getRegister = (req, res) => {
	res.render('./users/register');
};

function validateUserData(data) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const phoneRegex = /^(0[0-9]{9})$/;
	const nameRegex = /^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/;
	const passwordRegex = /^[^<>]{6,}$/;
	// Kiểm tra định dạng email
	if(!nameRegex.test(data.name)){
		return 'Tên người dùng không hợp lệ';
	}
	if (!emailRegex.test(data.email)) {
		return 'Email không hợp lệ';
	}
	if(!passwordRegex.test(data.password)){
		return 'Mật khẩu không hợp lệ'
	}
	if(data.confirmPassword!=data.password){
		return 'Mật khẩu không trùng khớp';
	}
	// Kiểm tra định dạng số điện thoại
	if (!phoneRegex.test(data.phoneNumber)) {
	  return 'Số điện thoại không hợp lệ';
	}
	// Nếu mọi thứ đều hợp lệ, trả về null hoặc một giá trị khác để chỉ ra sự thành công
	return null;
}

// Controller function to handle the registration form submission
const postRegister = async (req, res) => {
	try {
		// Extracting data from the request body
		const data = req.body;
		const validationError  = validateUserData(data)
		if(validationError){
			console.error(validationError);
			res.status(400).json({ error: validationError });
			//res.render('./users/register');
		}
		else{
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

const getMovieDetail = async (req, res) => {
	try {
		// Extracting the movie ID from the query parameters
		const id = req.query.movie; // Use req.query.movie for query parameters
		// Fetching the movie details based on the provided ID
		const movie = await Movie.findById(id)
		// Formatting the releaseYear using the moment library
		movie.releaseYear = moment(movie.releaseYear).format();
		// Rendering the movie detail page with the retrieved data
		res.render('./users/movie-detail', { movie: movie, moment: moment });
	} catch (err) {
		// Handling errors and sending a 500 status code with an error message
		res.status(500).json({ error: err });
	}
};


const getMovie = async (req, res) => {
	try {
		// Fetching all movies from the database
		const movies = await Movie.find();
		// Rendering the movie page with the retrieved movie data
		res.render('./users/movie', { movies: movies });
	} catch (err) {
		// Handling errors and sending a 500 status code with an error message
		res.status(500).json({ error: err });
	}
};


const getAccountEdit = async (req, res) => {
	try {
		// Extracting the user ID from the session
		const userID = req.session.userId;
		// Fetching provinces for city selection
		const city = await area.getProvinces();
		// Fetching user details based on the user ID
		const user = await User.findById(userID);
		// Rendering the edit page with user and city data
		res.render('./users/edit', { user: user, city: city });
	} catch (err) {
		// Handling errors and sending a 500 status code with an error message
		res.status(500).json({ error: err });
	}
};


const putAccountEdit = async (req, res) => {
	try {
		// Extracting user ID from the session
		const userID = req.session.userID;
		const data = req.body;
		console.log(data);
		// Updating user data based on the user ID
		if (await User.findOneAndUpdate(userID, data)) {
			// Sending a success response if the update is complete
			res.status(200).json({ message: 'Update complete' });
		}
	} catch (err) {
		// Handling errors and sending a 400 status code with an error message
		res.status(400).json({ error: err });
	}
};

const getSeatSelect = async(req,res)=>{
	try{
		const movieID = req.query.movie;  // Get the 'movie' parameter
   		const showtimeID = req.query.showtime;  // Get the 'showtime' parameter
		const movieShowtime = await Movie.findOne(
		{
			_id: movieID,
			//"showtimes._id": showtimeID
		},
		{
			title: 1,
			poster: 1,
			showtimes: {
				$elemMatch: { _id: showtimeID }
			}
		}
		);
		res.render('./users/seat',{movieShowtime: movieShowtime,moment: moment});
	}	
	catch(err){
		res.status(400).json({error:err});
	}
}

const postSeatSelect = async(req,res)=>{
	try{
		const data = req.body;
		//console.log(data);
		const newBooking = new Booking({
			user: data.user,
			movie: data.movie,
			showtimes: data.showtimes,
			seats: data.seats,
			cinema: 1,
			seatsType: data.seatsType,
			bookedAt: data.bookedAt,
		})
		if (await newBooking.save()) { //1 Query
			res.status(201).json(newBooking);
		}else{
			console.log(err);
		}
	}
	catch(err){
		res.status(400).json({error: err})
	}
}


// Exporting the controller functions
module.exports = {
	getLogin,
	postLogin,
	getRegister,
	postRegister,
	logout,
	getMovieDetail,
	getMovie,
	getAccountEdit,
	putAccountEdit,
	getSeatSelect,
	postSeatSelect,
};
