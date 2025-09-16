import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus(401); //Unauthorized
  console.log(authHeader); // Bearer Token
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("jwt error: ", err.message);
      return res.sendStatus(403);
    } // restricted invalid token
    req.user = decoded.username;
    next();
  });
};
