const friendsModel = require('../../app/models/friends')


async function testCreateFriendes(userObject){
    try {
        const result = await friendsModel.create(userObject)
        console.log(result);
        return result 
    } catch (error) {
        console.log(error);
    }
}

// 測試關係物件
const userObject1 ={uid1:3, uid2:13, approve:2}
const userObject2 ={uid1:13, uid2:3, approve:3}
const userObject3 ={uid1:3, uid2:12, approve:1}
const userObject4 ={uid1:12, uid2:3, approve:1}
const userObject5 ={uid1:3, uid2:11, approve:1}
const userObject6 ={uid1:11, uid2:3, approve:1}


// testCreateFriendes(userObject1)
// testCreateFriendes(userObject2)
// testCreateFriendes(userObject3)
// testCreateFriendes(userObject4)
// testCreateFriendes(userObject5)
// testCreateFriendes(userObject6)

