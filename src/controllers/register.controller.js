import users from "../models/users.json" assert { type: "json" };
import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcrypt";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const userDB = {
  users: users,
  setUsers: function (data) {
    this.users = data;
  },
};

export const handlenewUser = async (req, res) => {
  let { user, password } = req.body;
  user = user.toLowerCase();
  if (!user || !password)
    return res.status(400).json({ msg: "Username and password are rwquired" });
  //  checking for dublicate entry.

  const duplicateEntry = userDB.users.some(
    (entity) => entity.username === user
  );
  if (duplicateEntry) return res.status(409).send("Same user name found");
  try {
    // encrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // storing the data
    const newUser = {
      username: user,
      roles: {
        user: 1001,
      },
      password: hashedPassword,
    };
    userDB.setUsers([...userDB.users, newUser]);
    await fs.promises.writeFile(
      path.join(__dirname, "../models/users.json"),
      JSON.stringify(userDB.users)
    );
    res.status(201).json({ msg: `New user ${user} created` });
    console.log(userDB.users);
  } catch (err) {
    res.status(500).json({ msg: err.message || err });
  }
};
