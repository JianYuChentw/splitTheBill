
const responseStatus = require('../utils/response-status')

/**
 * 權限驗證
 * @param {string} role 角色權限
 * @returns 
 */
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