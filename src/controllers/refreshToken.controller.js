import users from "../models/users.json" assert { type: "json" };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

export const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(400).send("No cookie?.jwt found "); // JWT inside the cookies
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  const matchEntity = userDB.users.find(
    (people) => people.refreshToken === refreshToken
  );
  if (!matchEntity) return res.status(403).send("Got a wrong token"); // Basically provided a wrong token

  //!!!!!!!!!!!!!!!!!!!!!!!!! create JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || matchEntity.username !== decoded.username) {
      // the decoded give the payload which we create while making the Tokens using the jwt.sign
      return res.status(403).send("user name doesnot match");
    }
    const userRoles = Object.values(matchEntity.roles);
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: decoded.username,
          roles: userRoles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.json({ accessToken });
  });
};
