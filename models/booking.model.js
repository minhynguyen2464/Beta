const mongoose = require('mongoose')
const User = require('./user.model')
const Movie = require('./movie.model')

const bookingSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    },
    movie:{
        type: mongoose.Schema.Types.ObjectId, ref:'Movie'
    },
    bookedAt:{
        type: Date,
        required: true,
    },
    seats:{
        type: [String],
        required: true,
    }
})