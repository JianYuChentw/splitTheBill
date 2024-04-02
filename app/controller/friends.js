const friendsModel = require('../models/friends')
const responseStatus = require('../utils/response-status')

const friendsController = {
  getFriends: async (req, res) => {
    try {
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