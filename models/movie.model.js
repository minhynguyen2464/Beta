const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	director: {
		type: String,
		required: true,
	},
	cast: {
		type: [String],
		required: true,
	},
	genre: {
		type: [String],
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	language: {
		type: String,
		required: true,
	},
	releaseYear: {
		type: Date,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	poster: {
		type: String,
		required: true,
	},
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
