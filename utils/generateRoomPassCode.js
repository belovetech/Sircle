const generateRoomPassCode = () => {
  const alphabetNumeric = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let res = '';
  const len = 6;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < len; i++) {
    res += alphabetNumeric[Math.floor(Math.random() * alphabetNumeric.length)];
  }
  return `${res.slice(0, 3)}-${res.slice(3)}`;
};

module.exports = generateRoomPassCode;
