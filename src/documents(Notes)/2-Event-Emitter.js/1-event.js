import fs from "node:fs";
import { v4 as uuid4 } from "uuid";
import path from "node:path";
import { fileURLToPath } from "node:url";

import EventEmitter from "node:events";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function logevents(params) {
  const date = new Date();
  console.log(params);
  try {
    if (!fs.existsSync(path.resolve(__dirname, "./log"))) {
      await fs.promises.mkdir(path.resolve(__dirname, "./log"));
    }
    const logItem = `Dated: ${date.toLocaleString()} ID: ${uuid4()}  msg: ${params}\n`;

    await fs.promises.appendFile(
      path.resolve(__dirname, "./log/data.txt"),
      logItem,
      "utf-8"
    );
  } catch (err) {
    console.log("Error while writing:" + err);
  }
}

class MyEvent extends EventEmitter {}

const myEvent = new MyEvent();
myEvent.on("log", (param) => logevents(param));

for (let i = 0; i < 1000; i++) {
  setTimeout(() => {
    myEvent.emit("log", "HEllO new line Emitted");
  }, 500 * i);
}
