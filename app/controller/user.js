const usersModel = require('../models/user');
const responseStatus =require('../utils/response-status')
const AppError = require('../utils/handleError')


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
      const roleTag = 'uid';

      if (!findedUser || findedUser.password != password) {
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
              console.log('登出前裝置：', sessionID);
            }
          });
        }
      });

      req.session[roleTag] = findedUser.membersId;
      return res.json(responseStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },
  
  /**
   * 使用者登出
   * @param { Request } req
   * @param { Response} res
   */
  logOut: async (req, res) => {
    try {
      req.session.destroy();
      return res.json(responseStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },

  /**
   * 獲取使用者資料
   * @param { Request } req
   * @param { Response } res
   */
  userDate: async (req, res) => {
    try {
      const uid = req.uid;
      const result = await usersModel.read({ uid: uid });
      const respondsData = {
        ...responseStatus.SUCCESS,
        data: {
          level: result.level,
          username: result.username,
          phoneNumber: result.phone_number,
          email: result.email,
          createtime: result.createtime,
          updatetime: result.updatetime,
        }
      };
    
      return res.json(respondsData);
    } catch (error) {
      console.error(error);
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },

  /**
   * 更新密碼
   * @param { Request } req
   * @param { Response } res
   */
  updatePassword: async (req, res) => {
    try {
      const uid = req.uid;
      const newPassword = req.body.newPassword;
      const result = await usersModel.updatePassword(uid, newPassword);

      return res.json(responseStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },
};




module.exports = userController