
// This function connects to a MongoDB database using Mongoose library
// It takes a URL as a parameter and returns a Promise

import mongoose from 'mongoose';

const connectDB = (url) => {
    // Set strict mode for queries
    mongoose.set('strictQuery', true);

    // Connect to the database using the provided URL
    mongoose.connect(url)
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.log(`Error connecting to the database: ${err}`));
}

export default connectDB;


