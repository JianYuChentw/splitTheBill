const friendsModel = require('../../app/models/friends')



async function testUpdateFriends(usersFriendsObject){
    try {
        const result = await friendsModel.updateFriendRelation(usersFriendsObject)
        console.log(result);
    } catch (error) {
        throw new Error(error)
    }
}

const usersFriendsObject1 = {
  uid1: 11,
  uid2: 3,
  approve: 1,
};

// testUpdateFriends(usersFriendsObject1)
