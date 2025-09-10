// ! Write and readFile

import fs, { appendFile } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function task() {
  try {
    const data = await fs.promises.readFile(
      path.resolve(__dirname, "data/smallText.txt"),
      "utf-8"
    );
    console.log(data);
  } catch (err) {
    console.error("Error found in the try catch method : " + err);
  }
}
// task();

console.log("The directory path is :" + __dirname);

(async function taskonFile() {
  try {
    //  get counter
    let counter = await fs.promises.readFile(
      path.join(__dirname, "data/counter.txt"),
      "utf8"
    );
    for (let i = 0; i < 1; i++) {
      let count = Number(counter);
      count++;
      counter = count;
      await fs.promises.appendFile(
        path.resolve(__dirname, "data/bigText.txt"),
        `Hello World <-- ${count} \n`
      );
    }
    await fs.promises.writeFile(
      path.resolve(__dirname, "./data/counter.txt"),
      `${counter}`
    );
    const data = await fs.promises.readFile(
      path.resolve(__dirname, "data/bigText.txt"),
      "utf-8"
    );
    console.log(data);
  } catch (error) {
    console.error(error);
    j;
  }
});

process.on("uncaughtException", (err) => {
  console.error("We get some error" + err);
  process.exit;
});
