import express from "express";
import registerrouter from "./routes/register.routes.js";
import Authrouter from "./routes/Auth.routes.js";
const app = express();

const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use("/register", registerrouter);
app.use("/auth", Authrouter);
// Basic route
app.use((req, res) => {
  res.status(404).send("Not found data status 404");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
