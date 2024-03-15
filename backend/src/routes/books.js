const  BooksController = require('../controllers/BooksController') ;

const {Router} = require('express')
const {checkUserRole} = require('../middleware/authMiddleware')

const booksRoutes = Router();

booksRoutes.get('',BooksController.getList)
booksRoutes.get('/find',BooksController.getOne)

booksRoutes.post('',checkUserRole('librarian'),BooksController.create)
booksRoutes.patch('',checkUserRole('librarian'),BooksController.update)
booksRoutes.delete('',checkUserRole('librarian'),BooksController.delete)

module.exports =  booksRoutes