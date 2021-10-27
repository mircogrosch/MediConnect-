const { Person, Patient } = require("../db");

const createPatient = (req, res) => {
    const {dni, name, lastname, num_member} = req.body;
    Person.create(dni,name,lastname);
    const newPatient = Patient.create(num_member);
    newPatient.addPerson(dni);

};

const getPatients = () => {};

const getPatient = () => {};

module.exports = { getPatient, getPatients, createPatient };
