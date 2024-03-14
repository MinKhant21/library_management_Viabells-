const UserReposities = require('../repositories/UserReposities')
const UserController = {
     register: async (req,res) =>{
         let rdata =  await UserReposities.create(req.body);

         
         res.json(rdata)
          
     }
}


module.exports = UserController
