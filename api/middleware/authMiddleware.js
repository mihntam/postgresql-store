const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
  try {
    const jwtTokenFromClient = req.header("token");

    if (!jwtTokenFromClient) {
      return res.status(403).json("Not Authorized");
    }

    //jwt.verify compair 'token from client' and secretKeyFrom and if 'jwtTokenFromClient' and 'SECRET_KEY' matched the its return payload
    const payload = jwt.verify(jwtTokenFromClient, SECRET_KEY);

    req.user = payload;
    next();
  } catch (e) {
    console.error(e.message);
    return res.status(403).json("Not Authorized");
  }
};
