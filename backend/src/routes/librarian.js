// const  BorrowsController = require('../controllers/BorrowsController') ;

const {Router} = require('express')
const {checkUserRole} = require('../middleware/authMiddleware')

const router = Router();

// router.get('',BorrowsController.getList)
// router.post('',BorrowsController.create)
// router.patch('',BorrowsController.update)
// router.delete('',BorrowsController.delete)

module.exports =  router