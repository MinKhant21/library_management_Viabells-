const { where } = require("sequelize");
const { Borrows,Books,User } = require("../models");

const BorrowsReposities = {
  create: async (data) => {
    let user_id = data.user.user_id;
    let { book_id } = data.body;
    //is borrow
    let isExitBorrow = await Borrows.findAll({
      where: { book_id: book_id, status: "0" },
    });
    // console.log(isExitBorrow.length)
    if (isExitBorrow.length != 0) {
      return {
        status: "503",
        message: "This Book Already Borrow",
      };
    }
    try {
      let findMaxBook = await Borrows.findAll({
        where: { user_id: user_id, status: "0" },
      });
      if (findMaxBook.length <= 4) {
        const borrowsBook = await Borrows.create({
          user_id: user_id,
          book_id: book_id,
          borrow_date: new Date(),
        });
        return {
          status: "200",
          message: "Book Borrowed ",
        };
      }
      return {
        status: "500",
        message: "You can able to borrow maximum of 5 books ",
      };
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
  getAll:async () => {
     try {
          let borrowList= await Borrows.findAll({
               where:{status:"0"},
               include:[
                    {
                         model: Books,
                         attributes: ["book_id", "title"],
                         as: "book",
                    },
                    {
                         model: User,
                         attributes: ["user_id", "name","email"],
                         as: "user",
                    },
               ]
          })
          return {
               status: "200",
               message: "Borrows List ",
               data:borrowList
             };
     } catch (error) {
          return {
               status: "500",
               message: "Internal Server Error",
               error: error.message,
             };
     }
  },
  myBorrowList:async (data) => {
    let user_id = data.user.user_id;
    
    try {
      let booksList = await Borrows.findAll({
        where: { user_id: user_id, status: "0" },
        include:[
          {
               model: Books,
               attributes: ["book_id", "title"],
               as: "book",
          },
          {
               model: User,
               attributes: ["user_id", "name","email"],
               as: "user",
          },
     ]
      });
      return {
        status: "200",
        data:booksList,
        message: "Book Borrow List ",
      };
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
  updateBorrow:async(data) => {
    let user_id = data.user.user_id;
    let id = data.query.id;
    try {
      const borrowRecord = await Borrows.findOne({
        where: { borrow_id: id } // Filter criteria
      });
      if (borrowRecord) {
        // If the record is found, update its status
        const updatedRecord = await borrowRecord.update({ status: 1 });
        return {
          status: "200",
          message: "Book Borrow Updated ",
        };
        // console.log("Status updated successfully:", updatedRecord);
      } else {
        // If no record is found with the specified borrow_id
        return {
          status: "200",
          message: "Borrow record not found ",
        };
      }
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  }
};

module.exports = BorrowsReposities;
