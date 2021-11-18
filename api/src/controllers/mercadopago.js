const mercadopago = require('mercadopago');
const {Appointment} = require('../db.js')
mercadopago.configure({
  access_token: ''
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
        res.redirect(response.body.init_point);

      }).catch(function(error){
        console.log(error);
      });
      
}
const paymentFinish= async (req,res)=>{
  const {idAppointment} = req.query; 
  console.log("entro a paymentFinish")
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

      res.json(appointmentToAprobe)
  }catch{
    res.status(400)
  }
}

module.exports={ 
    doPayment,
    paymentFinish
}