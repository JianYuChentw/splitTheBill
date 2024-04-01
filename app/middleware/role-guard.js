
const responseStatus = require('../utils/response-status')

function roleGuard(role) {
  return (req, res, next) => {
    const uid = req.session[role];
    if (uid === undefined) {
      return res.json(responseStatus.NOT_LOGIN_USER);
    }
    req[role] = uid;
    next();
  };
}

module.exports = roleGuard