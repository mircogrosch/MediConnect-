const { Person, Patient } = require("../db");
const bcrypt = require("bcrypt-nodejs");
function encryptPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}
const createPatient = async (req, res) => {
  const {
    dni,
    name,
    lastname,
    address,
    imageProfile,
    email,
    password,
    num_member,
  } = req.body;
  const rol = "Patient";
  try {
    let newPerson = await Person.create(
      {
        dni,
        name,
        lastname,
        address,
        imageProfile,
        email,
        password: encryptPassword(password),
        rol,
      },
      {
        fields: [
          "dni",
          "name",
          "lastname",
          "address",
          "imageProfile",
          "email",
          "password",
          "rol",
        ],
      }
    );
    let newPatient = await Patient.create(
      {
        num_member,
      },
      {
        fields: ["num_member"],
      }
    );
    newPatient.setPerson(dni);
    res.json({ data: [newPerson, newPatient], msg: "Patient created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      msg: "something goes wrong",
    });
  }
};

const getPatients = async (req, res) => {
  try {
    let patients = await Patient.findAll({
      include: [
        {
          model: Person,
          attributes: [
            "dni",
            "name",
            "lastname",
            "address",
            "imageProfile",
            "email",
            "password",
            "rol",
          ],
          through: {
            attributes: [],
          },
        },
      ],
    });
    res.json({ data: patients, msg: "Pacientes de la BD" });
  } catch (error) {}
};

const getPatient = () => {};

module.exports = { getPatient, getPatients, createPatient };
