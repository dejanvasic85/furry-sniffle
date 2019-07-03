const Cryptr = require('cryptr');
const superSecretPassword = 'bizrewarder-2019';
const cryptr = new Cryptr('myTotalySecretKey');

const encrypt = value => {
  if (!value) {
    return '';
  }
  return cryptr.encrypt(value);
};

const decrypt = value => {
  if (!value) {
    return '';
  }
  return cryptr.decrypt(value);
};

module.exports = {
  encrypt,
  decrypt
};
