const express = require('express');
const router = express.Router();
const movieController = require('../controller/admin.controller');
const multer = require('multer');

// Set up Multer for handling file uploads
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'public/images'); // Destination folder for storing the files
	},
	filename: (req, file, cb) => {
		// Generate a filename by replacing spaces with hyphens
		const fileName = file.originalname.toLowerCase().split(' ').join('-');
		cb(null, fileName);
	},
});

const upload = multer({ storage: storage });

// Route to render the movie admin page
router.get('/admin/movie', (req, res, next) => {
	res.render('./admin/movie');
});

// Route to get all movies via API
router.get('/admin/api/movie', movieController.getMovie);

// Route to handle movie creation via API with file upload
router.post(
	'/admin/api/movie',
	upload.single('poster'), // Using Multer middleware to handle file uploads
	movieController.postMovie
);

// Exporting the router
module.exports = router;
