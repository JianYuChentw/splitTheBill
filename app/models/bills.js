const {pool} = require('../database/db')
const responseStatus = require('../utils/response-status')
const AppError = require('../utils/handleError')

/**
 * 創建帳單
 */
async function create (billsObject){
    try {
        const { creatId, billsTitle, billsTotal } = billsObject;

    } catch (error) {
        console.error(error);
        // throw new AppError(responseStatus)
    }
}

/**
 * 搜尋對帳單
 */


/**
 * 調整帳單
 */