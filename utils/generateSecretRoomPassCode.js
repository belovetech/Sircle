/* eslint-disable no-plusplus */
const generateSecretRoomPassCode = () => {
  const min = Math.ceil(100000);
  const max = Math.floor(999999);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateSecretRoomPassCode2 = () => {
  const alphabetNumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let res = '';
  const len = 6;

  for (let i = 0; i < len; i++) {
    res += alphabetNumeric[Math.floor(Math.random() * alphabetNumeric.length)];
  }
  res = `${res.slice(0, 3)}-${res.slice(3)}`;

  return res;
};

module.exports = {
  generateSecretRoomPassCode,
  generateSecretRoomPassCode2,
};
