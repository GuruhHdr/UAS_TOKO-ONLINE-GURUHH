const mongoose = require('mongoose');

const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Menampilkan stack trace di konsol untuk debugging
    if (err instanceof mongoose.Error) {
        // Handle Mongoose specific errors
        res.status(400).json({ message: err.message });
    } else {
        // Handle other errors
        res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
    }
};

module.exports = errorHandler;
