const {pool} = require('../database/db')
const {responseStatus} =require('../utils//response-status')


async function create(userObject) {
  try {
    const { username,phoneNumber, password, email } = userObject;
    const sql = `insert into members (username,phone_number, password, email) values (?, ?, ?, ?)`;
    const [affectedRows, insertId] = await pool.query(sql, [
      username,
      phoneNumber,
      password,
      email,
    ]);
    return { affectedRows, insertId };
  } catch (error) {
    throw new Error(responseStatus.DATABASE_CREATE_USER_ERROR.msg, error.message);
  }
}

async function read(userObject){
  try {
    const { username, phoneNumber, email } = userObject;
    let sql = `select username, phone_number, email from members where 1=1 `
    let values=[];

    if (username) {
      sql += `and username = ?`
      values.push(username);
    }

    if (phoneNumber) {
      sql += `and phone_number = ?`
      values.push(phoneNumber);
    }

    if (email) {
      sql += `and email = ? `
      values.push(email);
    }

    const [result] = await pool.query(sql, values);
    return result[0]
  } catch (error) {
    throw new Error(responseStatus.DATABASE_READ_USER_ERROR, error.message)
  }
}

async function update(userObject){

  
}

// const userObject = {
//   username : 'tset1',
//   phoneNumber : '0912345678',
//   password : 'ejwhiuh456',
//   email : 'ejwhiuh456@gmail.com',
// }

const userObject = {
  username: 'user1',
  phoneNumber: '0912345678',
  password: 'password1',
  email: 'user1@example.com'
}

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
  email: 'user4@example.com'
}

const userObject4 = {
  username: 'user5',
  phoneNumber: '0901235678',
  password: 'password5',
  email: 'user5@example.com'
}

const userObject5 = {
  username: 'user6',
  phoneNumber: '0967012345',
  password: 'password6',
  email: 'user6@example.com'
}

const userObject6 = {
  username: 'user7',
  phoneNumber: '0978013456',
  password: 'password7',
  email: 'user7@example.com'
}

const userObject7 = {
  username: 'user8',
  phoneNumber: '0980234567',
  password: 'password8',
  email: 'user8@example.com'
}

const userObject8 = {
  username: 'user9',
  phoneNumber: '0912345678',
  password: 'password9',
  email: 'user9@example.com'
}

const userObject9 = {
  username: 'user10',
  phoneNumber: '0923456789',
  password: 'password10',
  email: 'user10@example.com'
}



  create(userObject)
  create(userObject1)
  create(userObject2)
  create(userObject3)
  create(userObject4)
  create(userObject5)
  create(userObject6)
  create(userObject7)
  create(userObject8)
  create(userObject9)
 