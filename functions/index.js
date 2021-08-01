const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(`smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

exports.sendContactMessage = functions.database.ref('/messages/{pushId}').onCreate((snapshot, context) => {

  const val = snapshot.val();

  const mailOptions = {
    from: `Portfolio website <${gmailEmail}>`,
    to: 'irynaborniak@gmail.com',
    subject: `A new message from ${val.name}`,
    html: `<p>${val.message}</p>
    <br>
    <p>Sender email: ${val.email}</p>`
  };

  return mailTransport.sendMail(mailOptions).then(() =>
    console.log('Mail sent to: irynaborniak@gmail.com')
  ).catch(error => console.log(error));
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
