const bcrypt = require("bcrypt");

const getFullDate = () => {
  const currentDate = new Date();
  const formattedDate = currentDate
    .toLocaleString("es-PE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", "");

  return formattedDate;
};

const createPassword = async (plainTextPassword) => {
  const saltRounds = 10;

  return bcrypt
    .hash(plainTextPassword, saltRounds)
    .then((hash) => {
      return hash;
    })
    .catch((err) => console.error(err.message));
};

const verifyPassword = async (plainTextPassword, hash) => {
  return bcrypt
    .compare(plainTextPassword, hash)
    .then((res) => {
      return res;
    })
    .catch((err) => console.error(err.message));
};

exports.getFullDate = getFullDate;
exports.createPassword = createPassword;
exports.verifyPassword = verifyPassword;
