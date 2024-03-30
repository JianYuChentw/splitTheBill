function customRes(code,msg) {
    return{
        code:code,
        msg:msg ||''
    }
}

// 回應管理
const status ={
    // Database Response
    // 使用者
    DATABASE_CREATE_USER_ERROR:customRes('0011','資料庫新增使用者發生錯誤'), 
    DATABASE_READ_USER_ERROR:customRes('0012','檢索使用者資料時發生錯誤'),
    DATABASE_UPDATE_USER_ERROR:customRes('0013','更新使用者資料時發生錯誤'),

    // 好友
    DATABASE_CREATE_FRIENDS_ERROR:customRes('0014','新建好友資料時發生錯誤'),
    DATABASE_GET_FRIENDS_ERROR:customRes('0015','獲取好友資料時發生錯誤'),
    DATABASE_UPDATE_FRIENDS_ERROR:customRes('0016','更新好友資料時發生錯誤')
}

module.exports = status

