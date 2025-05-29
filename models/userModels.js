const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const UserRole = require('../utils/UeerRole')
const UserModel = new mongoose.Schema(
    {
        UserName: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
            unique: true
        },
        FirstName: {
            type: String,
            minlength: 3,
            maxlength: 30,
            required: true
        },
        LastName: {
            type: String,
            minlength: 3,
            maxlength: 30,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, "Invalid email address"]
        },
        password: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isStrongPassword, "weak password"]
        },
        token: {
            type: String
        },
        role: {
            type:String,
            enum: [UserRole.ADMIN, UserRole.USER, UserRole.VISITOR],
            default: UserRole.USER
        },
        avatar: {
            type: String
        }
    },{
        toJSON: {
            transform:(doc, ret, options) =>{
                delete ret.password;
                delete ret.__v
            }
        }
    }
)
// hash the password
UserModel.pre('save', function(){
    const hash = bcrypt.hashSync(this.password, 8);
    this.password = hash
});
module.exports = mongoose.model('User', UserModel)