const UserReposities = require("../repositories/UserReposities");
const UserController = {
  register: async (req, res) => {
    let rdata = await UserReposities.create(req.body);
    res.json(rdata);
  },
  login: async (req, res) => {
    let data = await UserReposities.login(req.body);
    res.json(data);
  },
};

module.exports = UserController;
