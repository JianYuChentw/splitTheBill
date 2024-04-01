const usersModel = require('../models/user');
const { get } = require('../routers');
const responseStatus =require('../utils/response-status')




const userController = {
  /**
   * 使用者登入
   * @param { Request } req
   * @param { Response } res
   */
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const findedUser = await usersModel.read({ username: username });

      if (findedUser.password != password || findedUser.username != username) {
        return res.json(responseStatus.LOGIN_FAIL);
      }

      //踢下線機制
      const allSessions = req.sessionStore.sessions;
      Object.keys(allSessions).forEach((sessionID) => {
        const sessionData = JSON.parse(allSessions[sessionID]);
        if (sessionData.uid === findedUser.membersId) {
          // 刪除符合條件的 session
          req.sessionStore.destroy(sessionID, function (err) {
            if (err) {
              console.error('登出前裝置發生錯誤:', err);
            } else {
              console.log('出登出前裝置：', sessionID);
            }
          });
        }
      });

      req.session.uid = findedUser.membersId;
      return res.json(responseStatus.SUCCESS);
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * 獲取使用者資料
   * @param { Request } req
   * @param { Response } res
   */
   userDate: async (req, res) => {
    try {
      console.log(req.sessionStore.sessions);
      return res.json(responseStatus.SUCCESS);
    } catch (error) {
      console.log(error);
    }
  },
};




module.exports = userController