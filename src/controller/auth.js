
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
            password
        } = req.body;
        
    
        const _user = new User({
            firstname,
            lastname,
            email,
            password,
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


exports.signin = (req, res) => {

    User.findOne({ email: req.body.email })
        .exec((error, user) => {

            if (error) return res.status(400).json({ error });

            if (user) {
                if (user.authenthicate(req.body.password) && user.role == 'user') {
                    const token = jwt.sign({ _id: user._id }, process.env.Jwt_Secret, { expiresIn: "1h" });
                    const {_id, firstname, lastname, email, role, fullname } = user;
                    res.status(200).json({

                        token,
                        user: {
                            _id,firstname, lastname, email, role, fullname
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

