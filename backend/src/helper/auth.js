const bcrypt = require('bcrypt')
const dotenv  = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config();
const  bcryptFormat = process.env.BCRYPT_ROUND

exports.hashPassword = (password)  => {
     return bcrypt.hash(password,1*12)
}

exports.comparePassword = (password) => {
     return bcrypt.compare(password,1*12)
}

exports.generateToken = (name) => {
     return jwt.sign(name,process.env.TOKEN_SECRET_KEY)
}