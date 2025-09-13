import { v1 as uuid1, v4 as uuid4 } from "uuid";
import fs from "node:fs";
const getTrial = (req, res) => {
  res
    .status(200)
    .json({ data: `this is a get request`, status: true, id: uuid1() });
  let content = `status : ${req.body.body} , ID:${uuid1()} , Method: ${
    req.method
  } \n`;
  (async () => {
    try {
      await fs.promises.appendFile("./src/data/5000-1-data.txt", content);
    } catch (err) {
      console.log("Found an error while writing in the file" + err);
    }
  })();
};

const putTrial = (req, res) => {
  res.status(201).json({
    data: `this is a put request`,
    status: true,
    id: uuid1(),
    msg: req.body.body,
  });
  let content = `status : ${req.body.body} , ID:${uuid1()} , Method: ${
    req.method
  } \n`;
  (async () => {
    try {
      await fs.promises.appendFile("./src/data/5000-1-data.txt", content);
    } catch (err) {
      console.log(
        "Found an error while writing in the file for the put method " + err
      );
    }
  })();
};

export default { getTrial, putTrial };
