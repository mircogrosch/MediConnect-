const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { HealthInsurance, Speciality } = conn.models;
const xlxs = require("xlsx");
const http = require('http')
const socketIO = require('socket.io');
const cors = require('cors')

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

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  const obras_sociales = excel_to_json(`${__dirname}/src/obras_sociales.xlsx`);
  const especialidades = excel_to_json(`${__dirname}/src/especialidades.xlsx`);
  addHealthInsurance(obras_sociales);
  addSpeciality(especialidades);

server.use(cors())

//socket.io
const server_pp = http.createServer(server); 
const io = socketIO(server_pp, {
  path:'/notification',
  cors:{
    origin: "http://localhost:3000",
    methods: ["GET","POST","PUT"]
  }
})
require('./src/controllers/notification')(io)
  //start server 

const port =3001

  server_pp.listen(port, () => {
    console.log(`Server is executed on port ${port}` ); // view on console
  });
});
