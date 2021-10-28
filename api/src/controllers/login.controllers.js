const { Person, Patient, Doctor } = require("../db");

async function getLogin(req, res) {
  let { email, password, remember } = req.body;
  try {
    let person = await Person.findOne({
      where: {
        email: email,
      },
    });

    if (person !== null) {
      //Si existe persona con ese email
      if (person.password === password) {
        //Si coincide password ingresada con la registrada del usuario
        //Para traer el perfil de DOCTOR
        if (person.rol === "Doctor") {
          let doctor = await Doctor.findOne({
            where: {
              personDni: person.dni,
            },
          });

          person = { ...person, doctor };
          person = {
            person: person.dataValues,
            doctor: person.doctor,
          };
          //Para traer el perfil de PACIENTE
        } else if (person.rol === "Patient") {
          let patient = await Patient.findOne({
            where: {
              personDni: person.dni,
            },
          });
          person = { ...person, patient };
          person = {
            person: person.dataValues,
            patient: person.patient,
          };
        }
        res.status(200).send({
          data: person,
          message: "Logged user",
        });
      } else {
        //Se encontro persona, pero password es incorrecta
        res.status(200).send({ message: "Incorrect password" });
      }
    } else {
      //No se encontro persona con email ingresado
      res.status(200).send({ message: "There is no such registered email" });
    }
  } catch (e) {
    res.status(400).send("Error desde base de datos: ", e);
  }
}

module.exports = {
  getLogin,
};
