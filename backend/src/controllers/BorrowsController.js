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
}

module.exports = BorrowsController