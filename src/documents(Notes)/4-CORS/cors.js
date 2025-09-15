import express from "express";
import cors from "cors";
// controllers
import trialController from "./controllers/trtial.controller.js";
// CORS
import { corsOption } from "./config/CorsConfig.js";
// also a refference is in the file corsOption.config.js

const app = express();
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", trialController.getTrial);
app.put("/", trialController.putTrial);

app.use((req, res) => {
  res.status(418).send("I refuse to brew coffee !!");
});

app.listen(5000, () => {
  console.log("Port is listening the 5000");
});

// the CORS is in the ./config/CorsConfig.js

// ? am putting it here in comments for better readability in single file .

/*
const whiteList = ["https://www.youtube.com", "http://localhost:5000"];

export const corsOption = {
  origin: (origin, Callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      this portion is allowed
      Callback(null, true);
    } else {
      this portion is Blocked
      Callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};


*/
