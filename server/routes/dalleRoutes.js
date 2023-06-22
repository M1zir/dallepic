/**
 * This file contains the code for the router that handles the requests for the Dalle API.
 * It uses the express framework to handle the requests and dotenv to load environment variables.
 * It also uses the OpenAI API to generate images based on prompts.
 */

import express from 'express';
import *  as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';
import Post from '../mongodb/models/post.js';

// Load environment variables
dotenv.config();

// Create a new router instance
const router = express.Router();

// Create a new OpenAI API instance
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration);

/**
 * Handles GET requests to the root endpoint.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.route('/').get((req, res) => {
    res.send('Hello, From Dalle');
});

/**
 * Handles POST requests to the root endpoint.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
router.route('/').post(async (req, res) => {
    try {
        // Extract the prompt from the request body
        const { prompt } = req.body;

        // Use the OpenAI API to generate an image based on the prompt
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        });  

        // Extract the image data from the OpenAI API response
        const image = aiResponse.data.data[0].b64_json;

        // Send the image data in the response
        res.status(200).json({photo: image})
    } catch (error) {
        // Log any errors and send an error response
        console.log(error);
        res.status(500).send(error?.response.data.error.message);   
    }
});

// Export the router
export default router;

