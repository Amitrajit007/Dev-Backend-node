import fs from "node:fs";
import users from "../models/users.json" assert { type: "json" };
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

export const userAuth = async (req, res) => {
  let { user, password } = req.body;
  user = user.toLowerCase();
  if (!user || !password)
    return res.status(400).json({ msg: "Username and password are rwquired" });
  const matchEntity = userDB.users.find((people) => people.username === user);
  if (!matchEntity) return res.status(401).json({ msg: "User not found." });
  const match = await bcrypt.compare(password, matchEntity.password);
  if (match) {
    const userRoles = Object.values(matchEntity.roles);
    //!!!!!!!!!!!!!!!!!!!!!!!!! create JWT
    const accessToken = jwt.sign(
      {
        userInfo: {
          username: matchEntity.username,
          roles: userRoles,
        },
      },
      // 👉 payload: data to embed inside the token
      process.env.ACCESS_TOKEN_SECRET, // 👉 secret key used to sign/verify the token
      { expiresIn: "30s" } // 👉 options: here, token expiry time (30 seconds)
    );
    // this payload is crusal cause we get it back from the jwt.varify's decoded part
    const refreshToken = jwt.sign(
      { username: matchEntity.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    const otherUser = userDB.users.filter(
      (person) => person.username !== matchEntity.username
    );
    const currentUser = { ...matchEntity, refreshToken };
    userDB.setUsers([...otherUser, currentUser]);
    // * saving the data in the file
    await fs.promises.writeFile(
      path.join(__dirname, "../models/users.json"),
      JSON.stringify(userDB.users)
    );
    // !!!!!!!!!!!!!!!!!! sending the refresh token as the cookies named "jwt"
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken });
  }
  res.status(401).json({ msg: `for ${user} incorrecr password` });
  //   horrible for the safety check :->
};
