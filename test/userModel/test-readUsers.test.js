const userModel = require('../../app/models/user')


const userObject1 = {
    username: 'user2',
  }
  
  const userObject2 = {
    phoneNumber: '0903456782',
    email: 'user3@example.com'
  }
  
  const userObject3 = {
    username: 'user5',
    phoneNumber: '0901456783',
  }

  const userObject4 = {
  }



  async function testReadUsers() {
    try {
        const result1 = await userModel.read(userObject1);
        const result2 = await userModel.read(userObject2);
        const result3 = await userModel.read(userObject3);
        const result4 = await userModel.read(userObject4);
        console.log(result1);
        console.log(result2);
        console.log(result3);
        console.log(result4);
    } catch (error) {
        console.error(error);
    }
}

testReadUsers();
