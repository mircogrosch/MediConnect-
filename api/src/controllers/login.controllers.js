const { Person, Patient, Doctor } = require("../db");

async function getLogin(req, res) {
  let { email, password } = req.body;
  const person = Person.findAll();
}

module.exports = {
  getLogin,
};
