const BorrowsReposities = require("../repositories/BorrowsReposities");


const BorrowsController = {
     create: async (req,res) => {
          let data = await BorrowsReposities.create(req);
          res.json(data)
     },
     getList: async (req,res) => {
          let data = await BorrowsReposities.getAll();
          res.json(data)
     },
     myBorrowList: async (req,res) => {
          let data = await BorrowsReposities.myBorrowList(req);
          res.json(data)
     },
     updateBorrow: async (req,res) => {
          let data = await BorrowsReposities.updateBorrow(req);
          res.json(data)
     },
}

module.exports = BorrowsController