import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
// * All the routes are here
import registerrouter from "./routes/register.routes.js";
import Authrouter from "./routes/Auth.routes.js";
import refreshToken from "./routes/refreshToken.routes.js";
import getrouter from "./routes/get.routes.js";
import logoutRouter from "./routes/logout.routes.js";
// * The custome middlewares
import { verifyJWT } from "./middleware/varifyJWT.js";
import cookieParser from "cookie-parser";
// config files for DB
import connectDB from "./config/dbConn.js";
const app = express();

const PORT = process.env.PORT || 5000;
// ? connection to DB.
connectDB();

// parsing the cookie

app.use(cookieParser());

// Middleware to parse JSON
app.use(express.json());
app.use("/register", registerrouter);
app.use("/auth", Authrouter);
app.use("/refresh", refreshToken);
app.use("/logout", logoutRouter);
app.use(verifyJWT);
app.use("/data", getrouter);
// Basic route
app.use((req, res) => {
  res.status(404).send("Not found data status 404");
});
// checking for some errors while connecting to the DB

//checking connection with the DB and Start the server
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
