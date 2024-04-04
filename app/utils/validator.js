const validator= require('validator')




const verify = {
  userName: (string) => {
    return validator.isLength(string, { min: 6, max: 12 });
  },
  password: (string) => {
    return validator.isLength(string, { min: 8, max: 16 });
  },
  phoneNumber: (string) => {
    return validator.isLength(string, { min:10, max:10}) && validator.isNumeric(string)
  },
  email: (string) => {
    return validator.isEmail(string)
  }
};




module.exports = verify
