const getController = (req, res) => {
  res.status(200).json({
    id: 101,
    name: "Amitrajit Sarkar",
    email: "amitrajit@example.com",
    age: 20,
    skills: ["JavaScript", "Node.js", "React", "C++"],
    isStudent: true,
    address: {
      city: "***",
      state: "***",
      country: "India",
    },
  });
};

const postController = (req, res) => {
  // editor
  const data = req.body;
  res.status(201).send(`welcome Editor`);
};
const putController = (req, res) => {
  // admin
  const data = req.body;
  res.status(201).send(`welcome Admin`);
};
const deleteController = (req, res) => {
  // dev
  const data = req.body;
  res.status(201).send(`welcome Dev`);
};

export default {
  getController,
  postController,
  putController,
  deleteController,
};
