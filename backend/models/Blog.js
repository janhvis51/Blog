// Import mongoose
const mongoose = require("mongoose");


// Create Blog Schema
// Schema tells MongoDB what one blog should look like.

const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

});


// Create Model

const Blog = mongoose.model("Blog", blogSchema);


// Export Model

module.exports = Blog;