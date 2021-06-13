const user = require('../models/user');
const User = require('../models/user');
const jwt=require('jsonwebtoken');
exports.signup=(req,res)=>{

    User.findOne({ email: req.body.email })
    .exec((error, user) => {
        if (user) return res.status(400).json({

            message: "User already registered"
        });

        const {
            firstname,
            lastname,
            email,
            hash_password
        } = req.body;
        
    
        const _user = new User({
            firstname,
            lastname,
            email,
            hash_password,
            username: Math.random().toString()

        });
        _user.save((error, data) => {
            if (error) {
                return res.status(400).json({
                    message: "Something Went wrong"
                });
            }
            if (data) {
                return res.status(201).json({
                    message:"User created successfully"
                });
            }


        });
    }

    );

}


exports.sigin = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec((error, user) => {

            if (error) return res.status(400).json({ error });

            if (user) {
                if (user.authenthicate(req.body.hash_password)) {
                    const token = jwt.sign({ _id: user._id }, process.env.Jwt_Secret, { expiresIn: "1h" });
                    const { firstname, lastname, email, role, fullname } = user;
                    res.status(200).json({

                        token,
                        user: {
                            firstname, lastname, email, role, fullname
                        }
                    });
                }
                else {
                    return res.status(400).json({
                        message: "Invalid password"
                    });
                }

            }
            else {
                return res.status(400).json({
                    message: "User not found"

                });
            }
        });


}