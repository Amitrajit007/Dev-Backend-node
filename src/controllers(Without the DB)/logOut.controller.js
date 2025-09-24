import users from "../models/users.json" assert { type: "json" };

// import FS from "node:fs";
// const fs = FS.promises; this can be written in 1 line like:--

import { promises as fs } from "node:fs";
import path from "node:path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const userDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

export const handleLogOut = async (req, res) => {
  // * frontend: On client, also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(204).send("Successful but no content to send back"); // Because we are deleting that anyway
  const refreshToken = cookies.jwt;
  //  is the refresh token still in the DB
  const matchEntity = userDB.users.find(
    (people) => people.refreshToken === refreshToken
  );
  if (!matchEntity) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.status(204).send("Token Removed from the cookie");
  }

  //delting the cookie from the
  const otherUser = userDB.users.filter(
    (person) => person.refreshToken !== matchEntity.refreshToken
  );

  const currentUser = { ...matchEntity, refreshToken: "" };
  //   lets update the DB

  userDB.setUsers([...otherUser, currentUser]);

  try {
    await fs.writeFile(
      path.resolve(__dirname, "../models/users.json"),
      JSON.stringify(userDB.users)
    );
  } catch (err) {
    console.log("Found an error in the file reading: ", err);
  }
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  //   In the production we must give the secure:true to get the https
};
