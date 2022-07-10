const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs")

const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PASSWORD_PATTERN = /[A-Za-z\d$@$!%*?&]{8,15}/
const WORK_FACTOR = 10

const userSchema = new Schema ({
    name: {
        type: String,
        trim: true,
        required: [true, 'Required name'],
        minLength: [3, 'Min 3 characters'],
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
        default: "https://s1.eestatic.com/2020/07/13/curiosidades/naturaleza-planeta-tierra/animales-fauna-naturaleza_504959968_155649339_1706x960.jpg",
        validate: {
            validator: function(img) {
                try {
                    new URL(img)
                    return true
                } catch (error) {
                    return false
                }
            },
            message: img => "invalid URL"
        },
    }
})

userSchema.pre("validate", function (next) {
    this.img = this.img || undefined
    next()
})

userSchema.pre("save", function (next) {
    if (this.isModified("password")) {
        bcrypt.hash(this.password, WORK_FACTOR)
            .then(hash => {
                this.password = hash
                next()
            })
            .catch(error => next(error))
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;