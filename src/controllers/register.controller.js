import User from "../models/User.js";
import bcrypt from "bcrypt";

export const handlenewUser = async (req, res) => {
  let { user, password } = req.body;
  user = user.toLowerCase();
  if (!user || !password)
    return res.status(400).json({ msg: "Username and password are rwquired" });
  //  checking for dublicate entry. using mongoose

  const duplicateEntry = await User.findOne({ username: user });
  if (duplicateEntry) {
    // console.log(duplicateEntry.roles); this is also possibe in this db method.
    return res.status(409).send("Same user name found"); //409 is the conflict
  }
  try {
    // encrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // storing the data in the DB
    const result = await User.create({
      username: user,
      // roles: {
      //   user: 1001,
      // },   this is provided as a default value in the DB schema so we dont need it here
      password: hashedPassword,
    });
    console.log(result);
    /* Another way of creating data from DOCS
    const contact = new Contact({
    email: req.body.email,
    query: req.body.query,
  });

  contact.save((err) => {
    if (err) {
      return res.status(500).send('Error saving data');
    }
    res.redirect('/thank-you');
  })
    */
    res.status(201).json({ msg: `New user ${user} created` });
  } catch (err) {
    res.status(500).json({ msg: err.message || err });
  }
};
