require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);

async function pool() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
pool();
sequelize.authenticate().then(() => console.log("succes"));
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);

sequelize.models = Object.fromEntries(capsEntries);
// Aca vendrian las relaciones

const { Person, Doctor, Patient, Speciality, SocialWork } = sequelize.models;

// Uno a muchos
Patient.belongsTo(Person); // crea tabla Person_id dentro de la tabla Patient
Person.hasMany(Patient);

// Uno a muchos
Doctor.belongsTo(Person);
Person.hasMany(Doctor);

// Uno a muchos
Patient.belongsTo(SocialWork);
SocialWork.hasMany(Patient);

// Muchos a Muchos
Doctor.belongsToMany(Speciality, { through: "Doctor_Speciality" });
Speciality.belongsToMany(Doctor, { through: "Doctor_Speciality" });

// Muchos a Muchos
Doctor.belongsToMany(SocialWork, { through: "Doctor_SocialWork" });
SocialWork.belongsToMany(Doctor, { through: "Doctor_SocialWork" });

// Muchos a Muchos
Doctor.belongsToMany(Patient, { through: "Doctor_Patient" });
Patient.belongsToMany(Doctor, { through: "Doctor_Patient" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
