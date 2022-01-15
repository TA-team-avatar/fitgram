const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashPassword = async (pw) => {
  if (typeof pw !== 'string') throw new Error('password is not a string');
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashed = await bcrypt.hash(pw, salt);

    return hashed;
  } catch (err) {
    console.log(err);
  }
};

const comparePassword = async (rawPW, pw) => {
  if (typeof rawPW !== 'string') throw new Error('password is not a string');
  if (typeof pw !== 'string') throw new Error('password is not a string');

  try {
    const match = await bcrypt.compare(rawPW, pw);
    return match;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { hashPassword, comparePassword };
