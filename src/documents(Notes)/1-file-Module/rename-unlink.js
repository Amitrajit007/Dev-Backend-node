import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// console.log(__dirname);
async function task() {
  try {
    await fs.promises.writeFile(
      "./src/data/newFile.txt",
      "Hello world!!",
      "utf-8"
    );
    console.log("✅ File written successfully!");
    setTimeout(async () => {
      await fs.promises.rename(
        "./src/data/newFile.txt",
        "./src/data/newFile-renamed.txt"
      );
      console.log("Rename completed✔️");
    }, 2000);
    setTimeout(async () => {
      await fs.promises.unlink("./src/data/newFile-renamed.txt");
      console.log("file deleted ✔️");
    }, 3000);

    console.log(fs.existsSync("./src1"));
    fs.mkdir("./hello");
  } catch (err) {
    console.error(err);
  }
}

task();
