// Importing necessary modules
const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// Route to render the login page
router.get('/login', userController.getLogin);

// Route to handle login form submission
router.post('/login', userController.postLogin);

// Route to render the registration page
router.get('/register', userController.getRegister);

// Route to handle registration form submission
router.post('/register', userController.postRegister);

// Route to handle user logout
router.get('/logout', userController.logout);

// Route to handle fetching and rendering movie details
router.get('/detail', userController.getMovieDetail);

// Route to handle fetching and rendering the movie page
router.get('/movie', userController.getMovie);

// Route to handle fetching and rendering the account edit page
router.get('/account/edit', userController.getAccountEdit);

// Route to handle updating user account information
router.put('/account/edit', userController.putAccountEdit);

// Default route to render the index page
router.get('/', (req, res) => {
	res.render('index');
});

// Exporting the router
module.exports = router;
