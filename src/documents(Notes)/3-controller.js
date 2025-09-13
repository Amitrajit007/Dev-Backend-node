import trialController from "./controllers/trtial.controller.js";
import express from "express";

const app = express();

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
