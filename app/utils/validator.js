const validator= require('validator')




const verify = {
  // 使用者姓名
  userName: (string) => {
    return validator.isLength(string, { min: 6, max: 12 });
  },

  // 密碼
  password: (string) => {
    return validator.isLength(string, { min: 8, max: 16 });
  },

  //  電話
  phoneNumber: (string) => {
    return (
      validator.isLength(string, { min: 10, max: 10 }) &&
      validator.isNumeric(string)
    );
  },

  // 電子郵件
  email: (string) => {
    return validator.isEmail(string);
  },

  approveLimit:(string) => {
    return validator.isNumeric(string, { min: 1, max:3})
  }

};




module.exports = verify
