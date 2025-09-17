import fs from "node:fs";
import users from "../models/users.json" assert { type: "json" };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";
import { ref } from "node:process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

export const handleRefreshToken = (req, res) => {
  const { cookies } = req;
  if (!cookies?.jwt) return res.status(400); // JWT inside the cookies
  const refreshToken = cookies.jwt;
  console.log(refreshToken);
  const matchEntity = userDB.users.find(
    (people) => people.refreshToken === refreshToken
  );
  if (!matchEntity) return res.sendStatus(403); // Basically provided a wrong token

  //!!!!!!!!!!!!!!!!!!!!!!!!! create JWT
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || matchEntity.username === decoded.username) {
      // the decoded give the payload which we create while making the Tokens using the jwt.sign
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.json({ accessToken });
  });
};
