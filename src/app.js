import express from "express";
// * All the routes are here
import registerrouter from "./routes/register.routes.js";
import Authrouter from "./routes/Auth.routes.js";
import refreshToken from "./routes/refreshToken.routes.js";
import getrouter from "./routes/get.routes.js";
import logoutRouter from "./routes/logout.routes.js";
// * The custome middlewares
import { verifyJWT } from "./middleware/varifyJWT.js";
import cookieParser from "cookie-parser";
const app = express();

const PORT = 5000;

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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
