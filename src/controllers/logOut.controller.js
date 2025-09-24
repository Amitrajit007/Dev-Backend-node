import User from "../models/User.js";

// import FS from "node:fs";
// const fs = FS.promises; this can be written in 1 line like:--

export const handleLogOut = async (req, res) => {
  // * frontend: On client, also delete the access token
  const cookies = req.cookies;
  if (!cookies?.jwt)
    return res.status(204).send("Successful but no content to send back"); // Because we are deleting that anyway
  const refreshToken = cookies.jwt;
  //  is the refresh token still in the DB
  const matchEntity = await User.findOne({ refreshToken });
  if (!matchEntity) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.status(204).send("Token Removed from the cookie");
  }

  //delting the cookie from the
  matchEntity.refreshToken = "";
  const result = await matchEntity.save();
  console.log(result);
  res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
  res.sendStatus(204);
  //   In the production we must give the secure:true to get the https
};
