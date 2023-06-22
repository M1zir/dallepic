// Importing necessary modules
import express from 'express'; // Express is a fast, unopinionated, minimalist web framework for Node.js
import * as dotenv from 'dotenv'; // Dotenv is a zero-dependency module that loads environment variables from a .env file
import cors from 'cors'; // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options
import connectDB from './mongodb/connect.js'; // Importing the connectDB function from the connect.js file
import postRoutes from './routes/postRoutes.js'; // Importing the postRoutes from the postRoutes.js file
import dalleRoutes from './routes/dalleRoutes.js'; // Importing the dalleRoutes from the dalleRoutes.js file

// Loading environment variables from .env file
dotenv.config();

// Creating an instance of express
const app = express();

// Enabling Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parsing incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(express.json({ limit: '50mb'}));

// Mounting the postRoutes on the '/api/v1/posts' path
app.use('/api/v1/posts', postRoutes);

// Mounting the dalleRoutes on the '/api/v1/dalle' path
app.use('/api/v1/dalle', dalleRoutes);

// Defining a route handler for the root path
app.get('/', async (req, res) => {
    res.send("Hello, world!");
})

// Starting the server
const startServer = async () => {
    try {
        // Connecting to the MongoDB database using the connectDB function
        connectDB(process.env.MONGODB_URL);

        // Starting the server on port 8080
        app.listen(8080, () =>  console.log('Server has started on port http://localhost:8080'));
    }
     catch (error) {
     console.log(error);   
    }
}

startServer();

// Exporting the dalleRoutes
export default dalleRoutes;