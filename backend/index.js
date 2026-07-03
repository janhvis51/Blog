// Import Express framework
const express = require("express");

// Import mongoose to connect with MongoDB
const mongoose = require("mongoose");

// Allows frontend (React) to communicate with backend
const cors = require("cors");

// Import all blog routes
const blogRoutes = require("./routes/blogRoutes");

// Create Express application
const app = express();

// Middleware

// Allows requests from frontend
app.use(cors());

// Converts JSON received from frontend into JavaScript object
app.use(express.json());


// -----------------------------
// MongoDB Connection
// -----------------------------

mongoose.connect("mongodb://127.0.0.1:27017/blogdb")
.then(() => {
    console.log("MongoDB Connected Successfully");
})
.catch((err) => {
    console.log(err);
});


// -----------------------------
// Test Route
// -----------------------------

app.get("/", (req,res)=>{

    res.send("Backend Running Successfully");

});


// -----------------------------
// Blog Routes
// -----------------------------

app.use("/blogs", blogRoutes);


// -----------------------------
// Start Server
// -----------------------------
console.log("INDEX FILE RUNNING");

app.delete("/check", (req, res) => {

    console.log("DELETE CHECK HIT");

    res.json({
        message: "DELETE WORKS"
    });

});
app.listen(5000, ()=>{

    console.log("Server Running On Port 5000");

});