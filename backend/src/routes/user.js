const  UserController = require('../controllers/UserController') ;

const {Router} = require('express')
const {checkUserRole,verifyToken} = require('../middleware/authMiddleware')

const userRoutes = Router();

userRoutes.post('/register',UserController.register)
userRoutes.post('/login',UserController.login)

userRoutes.get('/get-list',verifyToken,checkUserRole('librarian') , UserController.getList)


module.exports =  userRoutes