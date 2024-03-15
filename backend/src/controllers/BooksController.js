const BooksReposities = require("../repositories/BooksReposities");

const BooksController = { 
     create : async (req,res) => {
          let data = await BooksReposities.add(req.body);
          res.json(data)
     },
     getList : async (req,res) => {
          let data = await BooksReposities.getAll();
          res.json(data)
     },
     getOne : async (req,res) => {
          let data = await BooksReposities.getOne(req);
          res.json(data)
     },
     update : async (req,res) => {
          let data = await BooksReposities.update(req);
          res.json(data)
     },
     delete : async (req,res) => {
          let data = await BooksReposities.delete(req.query.id);
          res.json(data)
     },
}

module.exports = BooksController