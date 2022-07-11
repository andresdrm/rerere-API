const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const getTransporter = function () {
  let transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, 
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  return transport;
};



exports.sendRecoveryCodeEmail = async (userEmail, randomToken) => {
  let transporter = getTransporter();

  const options = {
    from: "ci0137@psgfanclubcr.com",
    to: userEmail,
    subject: "Su código de recuperación",
    text: `Utilice este código para recuperar su contraseña: ${randomToken}`,
    html: `Utilice este código para recuperar su contraseña: <strong>${randomToken}</strong>`,
  }

  await transporter.sendMail(options, function(err, info){
    if(err)
    {
      console.log(err);
      return;
    }
  });
};




