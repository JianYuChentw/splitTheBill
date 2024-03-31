const usersModel = require('../models/user')
const responseStatus =require('../utils/response-status')


const userController = {
  login: async (req, res) => {
    try {
        const { username, password } = req.body
        const userDate = await usersModel.read({username:username}) 
        console.log(userDate);
        if (userDate.password != password || userDate.username != userDate.username) {
            return res.json(responseStatus.LOGIN_FAIL)
        }
        // TODO:發送session
        
        return res.json(responseStatus.SUCCESS)
    } catch (error) {
        console.log(error);
        
    }
  },
};

module.exports = userController