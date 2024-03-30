const friendsModel = require('../../app/models/friends')




async function testGetUserFriends(usersFriendsObject) {
  try {
    const result = await friendsModel.getUserFriends(usersFriendsObject)
    console.log('誰的:',usersFriendsObject.uid1);
    console.log(result);
  } catch (error) {
throw new Error(error.message)
  }
}

// 好友關係
const usersFriendsObject1 = { uid1: 3, approve: 1 };
const usersFriendsObject2 = { uid1: 12, approve: 1}
const usersFriendsObject3 = { uid1: 11, approve: 1}

// 待確認關係
const usersFriendsObject4 = { uid1: 3, approve: 2 };
const usersFriendsObject5 = { uid1: 11, approve: 2 };

// 待回覆
const usersFriendsObject6 = { uid1: 13, approve: 3 };
const usersFriendsObject7 = { uid1: 3, approve: 3 };


testGetUserFriends(usersFriendsObject1)
testGetUserFriends(usersFriendsObject2)
testGetUserFriends(usersFriendsObject3)
// testGetUserFriends(usersFriendsObject4)
// testGetUserFriends(usersFriendsObject5)
testGetUserFriends(usersFriendsObject6)
testGetUserFriends(usersFriendsObject7)