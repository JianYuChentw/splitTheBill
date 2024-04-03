const friendsModel = require('../models/friends')
const responseStatus = require('../utils/response-status')

const friendsController = {
  getFriends: async (req, res) => {
    try {
        const uid = req.uid
        //TODO:驗證不能使用0
        const {approve} = req.query
        const usersFriendsObject = {uid1: uid,approve:Number(approve)}
        const getUserFriends = await friendsModel.getUserFriends(usersFriendsObject)
        const respondsData = {
            ...responseStatus.SUCCESS,
            data: getUserFriends
        }

         return res.json(respondsData);
    } catch (error) {
      console.error(error);
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },

  nweApprove: async (req, res) => {
    try {
    } catch (error) {
      console.error(error);
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },
  updateApprove: async (req, res) => {
    try {
    } catch (error) {
      console.error(error);
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },
};

module.exports = friendsController