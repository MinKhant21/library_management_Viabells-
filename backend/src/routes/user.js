const  UserController = require('../controllers/UserController') ;

const {Router} = require('express')

const userRoutes = Router();

userRoutes.post('/register',UserController.register)
userRoutes.post('/login',UserController.login)

module.exports =  userRoutes