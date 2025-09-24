import Employee from "../models/Employee.js";

const getAllEmployee = async (req, res) => {
  const AllEmployee = await Employee.find();
  if (!AllEmployee) return res.sendStatus(204);
  res.json(AllEmployee);
};

const createEmployee = async (req, res) => {
  if (!req?.body?.firstname || req?.body?.lastname) {
    return res.status(400).send("Fisrt and last names are required. ");
  }
  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).send("Data created of " + req.body.firstname);
  } catch (err) {
    console.log("Error is in the Employe create portion :" + err);
  }
};

const UpdateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).send("Id is Required to change the datas");
  }
  //   get the Employee from the given ID as a request.
  try {
    const selectedEmployee = await Employee.findById(req.body.id);
    if (req?.body?.firstname) selectedEmployee.firstname = req.body.firstname;
    if (req?.body?.lastname) selectedEmployee.lastname = req.body.lastname;
    const result = selectedEmployee.save();

    res.status(200).json({ msg: "Success", data: `${result}` });
  } catch (e) {
    console.log("This is the error in the update for findById");
  }
};

const DeleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).send("Id is Required to Delete the Employee");
  }
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.body.id);
    // * if the enrtry is delete then the "deletedEmployee" = the deleted entry will be there else it will be null
    if (!deletedEmployee) {
      return res.status(404).send("Employee not found");
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log("Error is found while deletign the employee from the ID");
  }
};

// the route is not added the conttroller is completed.
