
// This code defines a mongoose schema for a Post object, which has a name, prompt, and photo field. 
// The schema is then exported as a model for use in other parts of the application.

import mongoose from "mongoose";

// Define the schema for a Post object
const Post = new mongoose.Schema({
    name: {type: String, required: true}, // The name of the post, which is required
    prompt: {type: String, required: true}, // The prompt for the post, which is required
    photo: {type: String, required: true}, // The photo for the post, which is required
});

// Create a model for the Post schema
const PostSchema = mongoose.model('Post', Post);

// Export the Post schema as a model for use in other parts of the application
export default PostSchema;


