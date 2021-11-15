const nodemailer = require("nodemailer")

const emailSend = (req, res) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        post: 465,
        secure: true,
        auth: {
            user: "iandiaz270601@gmail.com",
            pass: "jdmzfyugyovtrohq"
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    let mailOptions = {
        from: "iandiaz270601@gmail.com",
        to: "robolfba@gmail.com",
        subject: "Enviado desde nodemailer",
        text: "Soy Ian"
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.status(500).send(error.message);
        } else {
            console.log("Email enviado");
            res.status(200).json(req.body)
        }
    })
}

module.exports = { emailSend };
