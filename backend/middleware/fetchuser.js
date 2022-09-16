var jwt = require("jsonwebtoken");
const JWT_SECRET = "RanaSunil9716";

const fetchuser = (req, res, next) => {
  // get user from the jwt and add id or req object
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate with valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate with valid token" });
  }
};
module.exports = fetchuser;
