const { Person } = require("../db");

const createAdmin = async (req, res) => {
  let result;
  try {
    if (req.file != undefined) {
      result = await cloudinary.v2.uploader.upload(req.file.path);
      result = result.url;
    }
  } catch (error) {
    console.log("Error con cloudinary:", error);
  }
  const { dni, name, lastname, address, email, password } = req.body;
  const rol = "Admin";
  if (dni && name && lastname && address && email && password) {
    try {
      let newAdmin = await Person.create(
        {
          dni,
          name,
          lastname,
          address,
          imageProfile: result,
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
      try {
        if (req.file != undefined) {
          await fs.unlink(req.file.path); // Elimina la imagen guardada en api/src/public/uploads
        }
      } catch (error) {
        console.log("Error eliminando la imagen guardada", error);
      }
      res.json({ data: [newAdmin], message: "Admin created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        data: error,
        message: "something goes wrong",
      });
    }
  } else {
    res.status(500).json({
      data: null,
      message: "No se enviaron todos los parametros",
    });
  }
};

const disablePerson = async (req, res) => {
  const { personDni } = req.query;
  try {
    const person = await Person.findOne({
      where: {
        dni: personDni,
      },
    });
    await Person.update(
      {
        rol: "Disable",
      },
      {
        where: {
          dni: personDni,
        },
      }
    );
    res.json({
      data: person,
      message: "Persona desactivada",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: error,
      message: "something goes wrong",
    });
  }
};

module.exports = {
  createAdmin,
  disablePerson,
};
