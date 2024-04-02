const responseStatus = require('../utils/response-status')


class AppError extends Error{
  /**
   * 自定義錯誤
   * @param {object} errObect 
   * @param {string} errObect.code - 狀態碼
   * @param {string} errObect.message - 回應訊息
   */
  constructor({code, message}) {
    super(message);
    this.code = code;
    
  }

   /**
   * 錯誤捕捉
   */
  static handleError(err,res){
    let errorResponse= new AppError(responseStatus.SYSTEM_ERROR);
    if (err.code && err.message) {
        errorResponse = {code: err.code, message: err.message }
    }
      console.error(new Date().toLocaleString(),'=>',errorResponse);
      return res.json({code: errorResponse.code, message: errorResponse.message});
  }
} 


module.exports = AppError