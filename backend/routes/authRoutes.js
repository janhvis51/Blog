const express = require("express");

const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// SIGNUP

router.post("/signup", async (req, res) => {

    const {
        name,
        email,
        password
    } = req.body;

    const existingUser =
        await User.findOne({
            email
        });

    if (existingUser) {

        return res.json({
            message: "User Already Exists"
        });

    }

    const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

    await User.create({

        name,

        email,

        password:
            hashedPassword

    });

    res.json({
        message:
            "Signup Successful"
    });

});


// LOGIN

router.post("/login", async (req, res) => {

    const {
        email,
        password
    } = req.body;

    const user =
        await User.findOne({
            email
        });

    if (!user) {

        return res.json({
            message:
                "User Not Found"
        });

    }

    const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

    if (!isMatch) {

        return res.json({
            message:
                "Wrong Password"
        });

    }

  const token =
    jwt.sign(

        {
            userId:
                user._id,

            name:
                user.name
        },

        "mysecretkey"

    );

    res.json({

        token,

        message:
            "Login Successful"

    });

});

module.exports = router;