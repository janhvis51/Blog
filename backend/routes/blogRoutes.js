// Import Express
const express = require("express");

// Create Router
const router = express.Router();

// Import Blog Model
const Blog = require("../models/Blog");

//---------------------------------------------------------
// --------------------------------------------------------
// GET ALL BLOGS
// URL : http://localhost:5000/blogs
//---------------------------------------------------------
//---------------------------------------------------------
console.log("BLOG ROUTES LOADED");
router.get("/", async (req, res) => {

    

        // Fetch all blogs from MongoDB
        const blogs = await Blog.find();

        // Send blogs to frontend
        res.json(blogs);

    
 

});


// ------------------------------------------------------
// CREATE NEW BLOG
// URL : http://localhost:5000/blogs
// ------------------------------------------------------

router.post("/", async (req, res) => {

    const blog = await Blog.create(req.body);

    res.status(201).json(blog);

});


// DELETE BLOG

router.delete("/:id", async (req, res) => {
console.log("DELETE ROUTE HIT");
    try {

        await Blog.findByIdAndDelete(req.params.id);

        res.json({
            message: "Blog Deleted Successfully"
        });

    }
    catch(error) {
      
        res.status(500).json({
            message: error.message

        
        });

    }

});

// Export Router

module.exports = router;