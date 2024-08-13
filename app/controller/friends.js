const friendsModel = require('../models/friends')
const userModel = require('../models/user')
const responseStatus = require('../utils/response-status')
const verify = require('../utils/validator')
 
const friendsController = {
  /**
   * 獲取當前好友
   * @param { Request } req
   * @param { Response } res
   * @returns
   */
  getFriends: async (req, res) => {
    try {
      const uid = req.uid;
      const { approve } = req.query;

      if (verify.approveLimit(Number(approve))) {
        return res.json(responseStatus.PARAMETER_LIMIT);
      }
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
  /**
   * 提出好友邀請
   * @param { Request } req
   * @param { Request } res
   * @returns
   */
  nweApprove: async (req, res) => {
    try {
      const uid1 = req.uid;
      const username = req.body.userName;
      const { membersId: uid2 } = await userModel.read({ username });

      if (!uid2) {
        return res.json(responseStatus.NOT_HAVE_USER);
      }

      const isUserFriends = await friendsModel.findFriend({
        uid1: uid2,
        uid2: uid1,
      });

      if (
        uid2 == uid1 ||
        (isUserFriends.length > 0 &&
          2 !== isUserFriends[0].approve &&
          isUserFriends[0].approve > 0)
      ) {
        return res.json(responseStatus.NOT_CANT_FRIEND);
      }
      
      // 原本是好友
      if (isUserFriends.length > 0 && isUserFriends[0].approve === 0) {
        await friendsModel.updateFriendRelation({ uid1, uid2, approve: 2 });
        await friendsModel.updateFriendRelation({
          uid1: uid2,
          uid2: uid1,
          approve: 3,
        });
      } else if (isUserFriends.length > 0 && isUserFriends[0].approve === 2) {
        await friendsModel.updateFriendRelation({ uid1, uid2, approve: 1 });
        await friendsModel.updateFriendRelation({
          uid1: uid2,
          uid2: uid1,
          approve: 1,
        });
      } else {
        await friendsModel.create({ uid1: uid1, uid2: uid2, approve: 2 });
        await friendsModel.create({ uid1: uid2, uid2: uid1, approve: 3 });
      }

      return res.json(responseStatus.SUCCESS);
    } catch (error) {
      console.error(error);
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },
  approve: async (req, res) => {
    try {
    } catch (error) {
      console.error(error);
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },
  /**
   * 答覆允許好友邀請
   * @param { Request } req
   * @param { Response } res
   * @returns
   */
  promiseApprove: async (req, res) => {
    try {
      const uid1 = req.uid;
      const username = req.query.userName;
      const { membersId: uid2 } = await userModel.read({ username });

    //   確認與對方關係
      const ishaveApproved = await friendsModel.findFriend({
        uid1,
        uid2,
        approve: 3,
      });
    //   確認與我方關係
      const ishaveResponds = await friendsModel.findFriend({
        uid1: uid2,
        uid2: uid1,
        approve: 2,
      });
      if (ishaveApproved.length == 0 || ishaveResponds.length === 0) {
        return res.json(responseStatus.INVALID_OPERATE);
      }
      await friendsModel.updateFriendRelation({ uid1, uid2, approve: 1 });
      await friendsModel.updateFriendRelation({ uid1: uid2, uid2: uid1, approve: 1 });

      return res.json(responseStatus.SUCCESS);
    } catch (error) {
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },
  /**
   * 解除好友關係
   * @param { Request } req
   * @param { Response } res
   * @returns
   */
  removeApprove: async (req, res) => {
    try {
        const uid1 = req.uid;
        const username = req.query.userName;
        const { membersId: uid2 } = await userModel.read({ username });
        console.log(uid1,uid2);
  
      //   確認與對方關係
        const ishaveApproved = await friendsModel.findFriend({
          uid1,
          uid2,
        });

        console.log(ishaveApproved);
      //   確認與我方關係
        const ishaveResponds = await friendsModel.findFriend({
          uid1: uid2,
          uid2: uid1,
        });

        if (
          ishaveApproved.length === 0 ||
          ishaveResponds.length === 0 ||
          ishaveApproved[0].approve === 0 ||
          ishaveResponds[0].approve === 0
        ) {
          return res.json(responseStatus.INVALID_OPERATE);
        }

          await friendsModel.updateFriendRelation({ uid1, uid2, approve: 0 });
          await friendsModel.updateFriendRelation({ uid1: uid2, uid2: uid1, approve: 0 });
    
          return res.json(responseStatus.SUCCESS);


    } catch (error) {
      return res.json(responseStatus.OPERATE_ERROR);
    }
  },
};

module.exports = friendsController