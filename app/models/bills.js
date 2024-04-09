const {pool} = require('../database/db')
const responseStatus = require('../utils/response-status')
const AppError = require('../utils/handleError');
const { search } = require('../routers');

/**
 * 創建帳單
 */
async function create (billsObject){
    try {
        const { creatId, billsTitle, billsTotal } = billsObject;

        const sql = 'insert into bills (create_id, bill_title, billTotal) values(?, ?, ?)';
        const [{affectedRows, insertedId}] = await pool.query(sql,[creatId, billsTitle, billsTotal])
        return {affectedRows, insertedId}

    } catch (error) {
        console.error(error);
        throw new AppError(responseStatus,DATABASE_CREATE_BILLS_ERROR)
    }
}

/**
 * 搜尋對帳單
 */
async function searchBillts(billsObject){
    try {
        
    } catch (error) {
     console.error(error); 
     throw new AppError(responseStatus.DATABASE_CREATE_USER_ERROR)
    }
}

/**
 * 調整帳單
 */