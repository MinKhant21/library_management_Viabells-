const  UserController = require('../controllers/UserController') ;

const {Router} = require('express')

const userRoutes = Router();

userRoutes.post('/register',UserController.register)

module.exports =  userRoutes