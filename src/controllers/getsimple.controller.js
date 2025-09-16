const getController = (req, res) => {
  res.status(200).json({
    id: 101,
    name: "Amitrajit Sarkar",
    email: "amitrajit@example.com",
    age: 20,
    skills: ["JavaScript", "Node.js", "React", "C++"],
    isStudent: true,
    address: {
      city: "Kolkata",
      state: "West Bengal",
      country: "India",
    },
  });
};
export default getController;
