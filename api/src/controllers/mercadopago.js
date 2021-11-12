const mercadopago = require('mercadopago');
mercadopago.configure({
  access_token: ''
});

const doPayment = (req, res)=> { 
    const {title, price} = req.body;
    let preference = {
        items: [
          {
            title: title,
            unit_price:price,
            quantity: 1,
          }
        ]
      };
      
      mercadopago.preferences.create(preference)
      .then(function(response){
        res.redirect(response.body.init_point);

      }).catch(function(error){
        console.log(error);
      });
      
}


module.exports={ 
    doPayment,
}