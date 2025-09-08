// ! streams
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { getDefaultHighWaterMark } from "node:stream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const stream = fs.createReadStream(
  path.resolve(__dirname, "./data/bigText.txt"),
  { highWaterMark: 100000 }
);
stream.on("data", (chunk) => {
  console.log(chunk);
});
stream.on("error", (error) => console.error(chunk));
