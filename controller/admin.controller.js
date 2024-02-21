// Importing the Movie model
const Movie = require('../models/movie.model');

// Controller function to get all movies
const getMovie = async (req, res) => {
	try {
		// Fetching all movies from the database
		const movies = await Movie.find({});
		// Sending the movies as a JSON response with a 200 status code
		res.status(200).json(movies);
	} catch (err) {
		// Handling errors and sending a 500 status code with an error message
		console.error(err);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

// Controller function to post a new movie
const postMovie = async (req, res) => {
	try {
		// Extracting data and file from the request
		const data = req.body;
		const file = req.file;
		console.log(file);
		// Extracting the filename from the uploaded file
		const uploadedFileName = file.filename;
		// Splitting and trimming cast and genre strings into arrays
		const cast = data.cast.split(',').map((name) => name.trim());
		const genre = data.genre.split(',').map((name) => name.trim());

		// Creating a new Movie instance with the extracted data
		const newMovie = new Movie({
			title: data.title,
			director: data.director,
			cast: cast,
			genre: genre,
			duration: data.duration,
			language: data.language,
			releaseYear: data.releaseYear,
			description: data.description,
			poster: uploadedFileName,
		});

		// Saving the new movie to the database and checking if it was successful
		if (await newMovie.save()) {
			// Logging the new movie and sending it as a JSON response with a 200 status code
			console.log(newMovie);
			res.status(200).json(newMovie);
		}
	} catch (err) {
		// Handling errors and sending a 400 status code with an error message
		console.error(err);
		res.status(400).json({ error: 'Registration failed. Please try again.' });
	}
};

const getShowtimes = async (req,res,next)=>{
	try{
		const movieID = req.query.movie;
		const movie = await Movie.findById(movieID);
		if (movie === null) {
			movie.title = '';
			movie.duration = '';
			movie.director = '';
		}		  
		res.render('./admin/showtime',{movie: movie})
	}
	catch(err){
		res.status(400).json({error: 'Get showtimes failed. Please try again.'})
	}
}

const postShowtimes = async(req,res,next)=>{
	try{
		const data = req.body;
		//console.log(data);
		const showtimeData =[];
		for(let i=0; i<data.length;i++){
			const showtimeObject = {
				time: data[i].showtime,
				seatsAvailable: data[i].seatAvailable,
				cinemaRoom: data[i].cinemaRoom,
			};
			showtimeData.push(showtimeObject);
		}
		console.log(showtimeData); //Pass
		
		const title = data[0].movieTitle;
		//const newShowtime = new Showtime(showtimeData)
		const movie = await Movie.findOneAndUpdate(
			{ title: title },
			//{ $set: { showtimes: showtimeData } }, Use if want to update
			{ $push: { showtimes: { $each: showtimeData } } },
			{ new: true }
		  );
	  
		  if (movie) {
			res.status(200).json({ message: 'Update complete', movie: movie });
		  } else {
			res.status(404).json({ error: 'Movie not found' });
		  }
	}
	catch(err){
		res.status(400).json({error: 'Post showtimes failed. Please try again.'})
	}
}

// Exporting the controller functions
module.exports = { getMovie, postMovie,getShowtimes, postShowtimes };
