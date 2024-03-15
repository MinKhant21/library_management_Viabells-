const { Books, Category } = require("../models/"); // Import your Books model
const BooksReposities = {
  add: async (data) => {
    const { category_id, title } = data;
    const existingBook = await Books.findOne({ where: { title: title } });
    if (existingBook) {
      return {
        status: "404",
        message: "Book already exists",
      };
    }
    try {
      const book = await Books.create({
        category_id: category_id,
        title: title,
      });

      return {
        status: "200",
        message: "Book Created",
        data: book,
      };
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
  getAll: async () => {
    try {
      let booksList = await Books.findAll({
        include: {
          model: Category,
          attributes: ["category_id", "name"],
          as: "category",
        },
      });
      return {
        status: "200",
        message: "Book List",
        data: booksList,
      };
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
  getOne: async (data) => {
    console.log(data)
    let id = data.query.id;
    try {
      let book = await Books.findOne({
        where:{book_id:id},
        include: {
          model: Category,
          attributes: ["category_id", "name"],
          as: "category",
        },
      });
      return {
        status: "200",
        message: "Book List",
        data: book,
      };
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
  update: async (data) => {
    let id = data.query.id;
    // let {title,category_id} = data.body
    const existingBook = await Books.findOne({ where: { book_id: id } });
    if (!existingBook) {
      return {
        status: "404",
        message: "Book Not exists",
      };
    }
    try {
      let book = await Books.update(data.body, { where: { book_id: id } });
      return {
        status: "200",
        message: "Book updated",
      };
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
  delete: async (id) => {
    const existingBook = await Books.findOne({ where: { book_id: id } });
    if (!existingBook) {
      return {
        status: "404",
        message: "Book Not exists",
      };
    }
    try {
      let book = await Books.destroy({ where: { book_id: id } });
      return {
        status: "200",
        message: "Book Deleted",
      };
    } catch (error) {
      return {
        status: "500",
        message: "Internal Server Error",
        error: error.message,
      };
    }
  },
};
module.exports = BooksReposities;
