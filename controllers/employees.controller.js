const Employee = require('../models/employee.model');

exports.getAll = async (req, res) => {
  try {
    const employees = await Employee.find().populate('department')
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand).populate('department');
    if (!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id).populate('department');
    if (!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const newEmployee = new Employee({ firstName: firstName, lastName: lastName, department: department });
    await newEmployee.save();
    res.json({ message: 'OK', employee: newEmployee });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


exports.update = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;
    const emp = await Employee.findById(req.params.id);
    if (emp) {
      emp.firstName = firstName;
      emp.lastName = lastName;
      if (department) {
        emp.department = department;
      }
      await emp.save();
      res.json(emp);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id).populate('department');
    if (deletedEmployee) {
      res.json(deletedEmployee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};