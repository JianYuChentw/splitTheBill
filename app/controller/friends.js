const friendsModel = require('../models/friends')
const userModel = require('../models/user')
const responseStatus = require('../utils/response-status')

const friendsController = {
  getFriends: async (req, res) => {
    try {
      const uid = req.uid;
      //TODO:驗證不能使用0
      const { approve } = req.query;
      const usersFriendsObject = { uid1: uid, approve: Number(approve) };
      const getUserFriends = await friendsModel.getUserFriends(
        usersFriendsObject
      );
      const respondsData = {
        ...responseStatus.SUCCESS,
        data: getUserFriends,
      };

      return res.json(respondsData);
    } catch (error) {
      console.error(error);
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },

  nweApprove: async (req, res) => {
    try {
      const uid = req.uid;
      const username = req.body.userName;
      const { membersId: uid2 } = await userModel.read({ username });

      if (!uid2) {
        return res.json(responseStatus.NOT_HAVE_USER);
      }

      const isUserFriends = await friendsModel.getUserFriends({ uid1: uid2 });

      if (uid2 == uid ||  (isUserFriends.length > 0 && isUserFriends[0].approve > 0)) {
        return res.json(responseStatus.NOT_CANT_FRIEND);
      }

      await friendsModel.create({ uid1: uid, uid2: uid2, approve: 2 });
      await friendsModel.create({ uid1: uid2, uid2: uid, approve: 3 });

      return res.json(responseStatus.SUCCESS);
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