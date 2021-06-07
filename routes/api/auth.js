const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const autheticateToken = require('../../middlewares/auth');

const User = require("../../modals/Users.js");

// @route POST api/auth
// @decs Autheticate user
// @access public
router.post("/", async (req, res) => {
    const { email, password } = req.body;

    // simple validation
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all fields." });
    }

    // check for existing user
    try {
        const user = await User.findOne({ email });
        if (user == null) {
            return res.status(400).json({
                message: "User does not exist.",
            });
        }

        // validate password
        const pass = await bcrypt.compare(password, user.password);
        if(!pass){
            return res.status(400).json({message: 'Wrong password.'});
        }

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

// @route GET api/auth/user
// @decs Get user data
// @access private
router.get('/user', autheticateToken, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(user == null)  return res.status(400).json({message: 'Cannot find the user.'})
        res.json(user);
    } catch(err) {
        console.log(err);
        res.status(400).json({message: 'Unable ot search teh user.'});
    }
})



module.exports = router;
