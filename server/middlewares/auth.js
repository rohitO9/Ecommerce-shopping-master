const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");


authRoutes.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.json("No user exists");
        }
        
        // Compare passwords
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json("Password is incorrect");
        }
        
        // If email and password are correct
        res.json("Success");
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Error Logging In" });
    }
});

        authRoutes.post("/register", async (req, res) => {
            try {
                const { username, email, password } = req.body;
                const existinguser = await User.findOne({ username, email });

                if (existinguser) {
                    return res.status(404).json({ error: "username or password already exist" })
                }
                const salt = await bcrypt.genSalt(10);
                const hashedpassword = await bcrypt.hash(password, salt);

                const user = new User({
                    username,
                    email,
                    password: hashedpassword
                })

                const savedUser = await user.save()
                res.json({
                    message: "user created successfully!",
                    userId: savedUser._id
                })
            }
            catch (err) {
                console.log(err);
                res.status(500).send("Error creating a user.");
            }

        })
        module.exports = authRoutes;
