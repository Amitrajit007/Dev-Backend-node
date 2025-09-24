import jwt from "jsonwebtoken";


export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401); //Unauthorized
  // * just want the Bearer token thus the optional chaining --> authHeader?.startsWith("Bearer")
  // console.log(authHeader); // Bearer Token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("jwt error: ", err.message);
      return res.sendStatus(403);
    } // restricted invalid token
    req.user = decoded.username;
    req.roles = decoded.userInfo.roles;
    next();
  });
};
