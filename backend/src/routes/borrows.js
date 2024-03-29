const  BorrowsController = require('../controllers/BorrowsController') ;

const {Router} = require('express')
const {checkUserRole,verifyToken} = require('../middleware/authMiddleware')

const router = Router();

router.get('',verifyToken,checkUserRole('librarian'),BorrowsController.getList)
router.get('/my-borrow-list',verifyToken,BorrowsController.myBorrowList)
router.patch('/returnBook',verifyToken,BorrowsController.updateBorrow)
router.post('',verifyToken,BorrowsController.create)
// router.patch('',BorrowsController.update)
// router.delete('',BorrowsController.delete)

module.exports =  router