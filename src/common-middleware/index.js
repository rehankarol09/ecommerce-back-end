const jwt = require('jsonwebtoken');
const multer = require('multer');
const shortid = require('shortid');
const path = require('path');



//storing file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"))
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname)
  }
})

exports.upload = multer({ storage:storage });




exports.requiresignin = (req, res, next) => {

    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        //console.log(token);
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        
    }
    else {
        return res.status(500).json({
            message: 'Authorization required'
        });
    }

    next();

};

exports.userMiddleware = (req, res, next) => {
    if (req.user.role != 'user') return res.status(402).json({ message: 'Acess denied' });
    next();

};



exports.adminMiddleware = (req, res, next) => {
    if (req.user.role != 'admin') return res.status(402).json({ message: 'Acess denied' });
    next();
};