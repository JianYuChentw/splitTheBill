const userModel = require('../../app/models/user')

async function testUpdatePassword(uid, newpassword) {
    try {
        const result = await userModel.updatePassword(uid, newpassword)
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// testUpdatePassword(4, 'dsf8984894')