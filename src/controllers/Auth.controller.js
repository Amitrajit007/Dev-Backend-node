import users from "../models/users.json" assert { type: "json" };
import bcrypt from "bcrypt";

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
    res.status(400).json({ msg: "Username and password are rwquired" });
  const matchEntity = userDB.users.find((people) => people.username === user);
  if (!matchEntity) return res.status(401).json({ msg: "User not found." });
  const match = await bcrypt.compare(password, matchEntity.password);
  if (match) {
    // create JWT
    return res
      .status(201)
      .json({ msg: `user found and Validated , Welcome ${user}` });
  }
  res.status(401).json({ msg: `for ${user} incorrecr password` });
  //   horrible for the safety check :->
};
