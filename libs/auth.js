const jwt = require("jsonwebtoken");
const secret = require("./env").secret;
const User = require("../models/user");
module.exports = async function ({ req }) {
  let token = null;
  let currentUser = null;

  token = req.headers["authorization"];

  if (!token) return {};

  const decodeInfo = jwt.verify(token, secret);
  if (token && decodeInfo) {
    currentUser = await User.findById(decodeInfo.id);
    if (!currentUser) throw new Error("Invalid token");
  }

  return {
    token,
    currentUser,
  };
};
