const userModel = require('../../app/models/user')
  
  const userObject1 = {
    username: 'user2',
    phoneNumber: '0902345678',
    password: 'password2',
    email: 'user2@example.com'
  }
  
  const userObject2 = {
    username: 'user3',
    phoneNumber: '0903456782',
    password: 'password3',
    email: 'user3@example.com'
  }
  
  const userObject3 = {
    username: 'user4',
    phoneNumber: '0901456783',
    password: 'password4',
    email: 'user4@example.com',
  }

  
//   (async () => {
//     const result1= await userModel.create(userObject1);
//     const result2=await userModel.create(userObject2);
//     const result3= await userModel.create(userObject3);
//     console.log(result1, result2, result3)
//   });

