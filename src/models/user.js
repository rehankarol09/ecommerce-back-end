const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,

    },
    lastname: {
        type: String,
        required: true,
        trim: true,

    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    hash_password: {
        type: String,
        required:true
        
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    contact_No: {
        type: String,
    },
    profile_picture: { type: String }
},
    { timestamps: true });

userSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    });

userSchema.virtual('fullname')
 .get(function()
 {
     return `${this.firstname} ${this.lastname}`
 })

userSchema.methods = {
    authenthicate: function (password) {
        return bcrypt.compareSync(password, this.hash_password);
    }

}

//module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Customer', userSchema);