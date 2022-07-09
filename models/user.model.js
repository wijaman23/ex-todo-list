const mongoose = require("mongoose")
const Schema = mongoose.Schema

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PASSWORD_PATTERN = /[A-Za-z\d$@$!%*?&]{8,15}/

const userSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: [true, 'Required name'],
        min: [3, 'Mi 3 characters'],
    },
    password: {
        type: String,
        required: [true, 'Required password'],
        match: [PASSWORD_PATTERN, 'Invalid password'],
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: [true, 'Email already exists'],
        required: [true, 'Email address is required'],
        match: [EMAIL_PATTERN, 'Invalid Email'],
    },
    img:{
        type: String,
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;