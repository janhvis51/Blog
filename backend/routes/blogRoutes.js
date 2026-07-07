// Import Express
const express = require("express");

// Create Router
const router = express.Router();

// Import Blog Model
const Blog = require("../models/Blog");

// Import JWT Middleware
const verifyToken = require("../middleware/authMiddleware");

console.log("BLOG ROUTES LOADED");

// ------------------------------------------------------
// GET ALL BLOGS
// URL : http://https://blog-udlp.onrender.com/blogs
// ------------------------------------------------------

router.get("/", async (req, res) => {

    const blogs = await Blog.find();

    res.json(blogs);

});

// ------------------------------------------------------
// GET SINGLE BLOG
// URL : http://https://blog-udlp.onrender.com/blogs/:id
// ------------------------------------------------------

router.get("/:id", async (req, res) => {

    const blog =
        await Blog.findById(
            req.params.id
        );

    res.json(blog);

});

// ------------------------------------------------------
// CREATE BLOG
// URL : http://https://blog-udlp.onrender.com/blogs
// Protected Route
// ------------------------------------------------------

router.post(
    "/",
    verifyToken,
    async (req, res) => {

        const blog =
            await Blog.create({

                title:
                    req.body.title,

                content:
                    req.body.content,

                userId:
                    req.user.userId

            });

        res.status(201).json(blog);

    }
);
// ------------------------------------------------------
// UPDATE BLOG
// URL : http://https://blog-udlp.onrender.com/blogs/:id
// Protected Route
// ------------------------------------------------------

router.put(
    "/:id",
    verifyToken,
    async (req, res) => {

        try {

            const blog =
                await Blog.findById(
                    req.params.id
                );

            if (

                blog.userId.toString()

                !==

                req.user.userId

            ) {

                return res.status(403).json({

                    message:
                        "Not Authorized"

                });

            }

            const updatedBlog =
                await Blog.findByIdAndUpdate(

                    req.params.id,

                    req.body,

                    {
                        new: true
                    }

                );

            res.json(updatedBlog);

        }
        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }
);

// ------------------------------------------------------
// DELETE BLOG
// URL : http://https://blog-udlp.onrender.com/blogs/:id
// Protected Route
// ------------------------------------------------------

router.delete(
    "/:id",
    verifyToken,
    async (req, res) => {

        try {

            const blog =
                await Blog.findById(
                    req.params.id
                );

            if (

                blog.userId.toString()

                !==

                req.user.userId

            ) {

                return res.status(403).json({

                    message:
                        "Not Authorized"

                });

            }

            await Blog.findByIdAndDelete(
                req.params.id
            );

            res.json({

                message:
                    "Blog Deleted Successfully"

            });

        }
        catch (error) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }
);

// Export Router

module.exports = router;