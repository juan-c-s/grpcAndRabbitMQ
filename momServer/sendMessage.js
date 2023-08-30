const sgMail = require('@sendgrid/mail')

require( 'dotenv').config();
const {SENDGRID_API_KEY, SENDGRID_SENDER} = process.env


sgMail.setApiKey(SENDGRID_API_KEY)
const sendMessage=(message, to)=>{
    const msg = {
      to, // Change to your recipient
      from: SENDGRID_SENDER, // Change to your verified sender
      subject: 'Mensaje Recibido en el MOM',
      text: 'Tranquilo! Hemos recibido tu mensaje',
      html: `<strong>Recibido desde el MicroServicio 1, Response: ${message}</strong>`,
    }
    sgMail
          .send(msg)
          .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
          })
          .catch((error) => {
            console.error(error)
          })
    return msg;
  }
  module.exports = sendMessage