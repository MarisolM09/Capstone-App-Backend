const jwt = require("jsonwebtoken");

const checkJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("header", authHeader);
  const [bearer, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(token, "secret");
    // req.user = decoded;
    console.log("label decoded", decoded);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = { checkJwt };
