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

const userObject1 ={uid1:5, uid2:7}

// testCreateFriendes(userObject1)

