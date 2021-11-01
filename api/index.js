const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { HealthInsurance, Speciality } = conn.models;
const xlxs = require("xlsx");

const excel_to_json = (dir) => {
  const excel = xlxs.readFile(dir);
  let datos = xlxs.utils.sheet_to_json(excel.Sheets[excel.SheetNames[0]]);
  return datos;
};

async function addHealthInsurance(datos) {
  datos = datos.map((obra) => {
    return {
      id: obra.id,
      name: obra.name.toString().trim(),
      postal_code: obra.postal_code,
      province: obra.province.toString().trim(),
    };
  });
  await HealthInsurance.bulkCreate(datos, {
    fields: ["id", "name", "postal_code", "province"],
    ignoreDuplicates: true,
  });
}

async function addSpeciality(datos) {
  await Speciality.bulkCreate(datos, {
    fields: ["id", "name"],
    ignoreDuplicates: true,
  });
}

const no_existen_Especialidades = async () => {
  const especialidades = await Speciality.findAll();
  return especialidades.length === 0 ? true : false;
};

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  if (await no_existen_Especialidades()) {
    const obras_sociales = excel_to_json(
      `${__dirname}/src/obras_sociales.xlsx`
    );
    const especialidades = excel_to_json(
      `${__dirname}/src/especialidades.xlsx`
    );
    addHealthInsurance(obras_sociales);
    addSpeciality(especialidades);
  }
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // view on console
  });
});
