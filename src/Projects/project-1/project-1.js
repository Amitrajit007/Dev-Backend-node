// ! Description
/*
Build a simple REST API with Express.

Endpoints:

GET/notes → return all notes.

POST/notes → add a note.

DELETE/notes/:id → delete a note.

Store notes in a JSON file or just in-memory array.
*/

import express from "express";
// import notes from "./NOTES.json" assert { type: "json" };
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let notes = await getDataFromFile();

const app = express();

// midddleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function saveNotesInFile(notes) {
  try {
    await fs.promises.writeFile(
      path.join(__dirname, "/NOTES.json"),
      JSON.stringify(notes, null, 2)
    );
  } catch (err) {
    console.error("Found an error while saveing data in file " + err);
  }
}
async function getDataFromFile() {
  try {
    const res = await fs.promises.readFile(
      path.join(__dirname, "/NOTES.json"),
      "utf-8"
    );
    return JSON.parse(res);
  } catch (err) {
    return [];
  }
}

// GET

app.get("/notes", (req, res) => {
  res.status(200).json(notes);
});
// post

app.post("/notes", (req, res) => {
  const notesAdded = req.body.notes;
  if (!notesAdded) {
    return res
      .status(400)
      .json({ Success: false, msg: "Plz provide something" });
  }
  const newNote = { id: notes.length + 1, notes: notesAdded };
  notes.push(newNote);
  saveNotesInFile(notes);
  res.status(200).json({ Success: true, result: notes });
});

console.log(__dirname);
// delete
app.delete("/notes/:id", (req, res) => {
  const { id } = req.params;
  const exsistance = notes.some((n) => n.id === Number(id));
  if (!exsistance) {
    return res
      .status(400)
      .json({ Success: false, msg: `No such entry found with ID : ${id}` });
  }
  notes = notes.filter((n) => n.id !== Number(id));
  saveNotesInFile(notes);
  res.status(200).json({ Success: true, result: notes });
});

app.listen(5000, () => {
  console.log("At 5000");
});
