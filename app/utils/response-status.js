function customRes(code,msg) {
    return{
        code:code,
        msg:msg ||''
    }
}

// 回應管理
const status ={
    // Database Response
    DATABASE_CREATE_USER_ERROR:customRes('0011','資料庫新增使用者發生錯誤'), 
    DATABASE_READ_USER_ERROR:customRes('0012','檢索使用者資料時發生錯誤')
}

module.exports ={
    status
}
