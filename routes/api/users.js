const express = require("express");
const usersRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../modals/Users.js");

// @route POST api/users
// @decs Register new user
// @access public
usersRouter.post("/", async (req, res) => {
    const { name, email, password } = req.body;

    // simple validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields." });
    }

    // check for existing user
    try {
        const existedUser = await User.findOne({ email });
        if (existedUser != null) {
            return res.status(400).json({
                message: "This email has been registered.",
            });
        }

        const hashedPassword = await hashPassword(password, res);
        if (hashedPassword == null) return;

        const newUser = new User({ name, email, password: hashedPassword });
        const user = await newUser.save();

        try {
            const token = await jwt.sign(
                {
                    id: user._id,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: 3600,
                }
            );

            res.json({
                token, 
                user
            })
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to search for existed user" });
    }
});

async function hashPassword(password, res) {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Error: cannot hash the password." });
    }
}

module.exports = usersRouter;
