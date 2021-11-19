const mercadopago = require('mercadopago');
const {Appointment} = require('../db.js')
mercadopago.configure({
  access_token: 'TEST-4153455155462386-111802-36730dadd86dded939c410bbd287f9d5-1021414497'
});

const doPayment = (req, res)=> { 
    const {title, price,idPayment,idPatient} = req.body;
    let preference = {
        items: [
          {
            title: title,
            unit_price:price,
            quantity: 1,
          },       
        ],
         back_urls: {
           success: `http://localhost:3001/checkout/payment?idAppointment=${idPayment}&idPatient=${idPatient}`,
       },
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){

        res.send(response.body.id);

      }).catch(function(error){
        console.log(error);
      });
      
}
const paymentFinish= async (req,res)=>{
  const {idAppointment,idPatient} = req.query; 
 
 
    try{ 
      const appointmentToAprobe= await Appointment.findOne({
         where:{
           id:idAppointment
         }
       }) 

       const update = await Appointment.update({ 
         date: appointmentToAprobe.dataValues.date,
         day: appointmentToAprobe.dataValues.day,
         day_name: appointmentToAprobe.dataValues.day_name,
         month:appointmentToAprobe.dataValues.month,
         year:appointmentToAprobe.dataValues.year,
         hour:appointmentToAprobe.dataValues.hour,
         minutes: appointmentToAprobe.dataValues.minutes,
         payment_status: "Abonado",
       }, {
       where: {
         id: idAppointment
       }
     })

     res.redirect(`http://localhost:3000/account/patient/schedule/${idPatient}`)
     
 }catch{
   res.status(400)
 }
  
}

module.exports={ 
    doPayment,
    paymentFinish
}