const mercadopago = require('mercadopago');
const {Appointment} = require('../db.js')
mercadopago.configure({
  access_token: 'TEST-4153455155462386-111802-36730dadd86dded939c410bbd287f9d5-1021414497'
});

const doPayment = (req, res)=> { 
    const {title, price,idPayment} = req.body;
    let preference = {
        items: [
          {
            title: title,
            unit_price:price,
            quantity: 1,
          },       
        ],
         back_urls: {
           success: `http://localhost:3001/checkout/payment?idAppointment=${idPayment}`,
       },
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){

        console.log(response.body)
        res.send(response.body.id);

      }).catch(function(error){
        console.log(error);
      });
      
}
const paymentFinish= async (req,res)=>{
  const {idAppointment} = req.query; 
  console.log(req.query)
 
    try{ 
      const appointmentToAprobe= await Appointment.findOne({
         where:{
           id:idAppointment
         }
       }) 

       await Appointment.update({ 
         date: appointmentToAprobe.date,
         day: appointmentToAprobe.day,
         day_name: appointmentToAprobe.day_name,
         month:appointmentToAprobe.month,
         year:appointmentToAprobe.year,
         hour:appointmentToAprobe.hour,
         minutes: appointmentToAprobe.minutes,
         payment_status: "Abonado",
       }, {
       where: {
         id: idAppointment
       }
     })

     res.status(200)
 }catch{
   res.status(400)
 }
  
}

module.exports={ 
    doPayment,
    paymentFinish
}