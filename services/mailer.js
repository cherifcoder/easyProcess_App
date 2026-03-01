// services/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

/**
 * Envoie un PDF à un étudiant (ou autre destinataire)
 * @param {string} to - adresse email du destinataire
 * @param {string} subject - sujet du mail
 * @param {string} text - corps du message
 * @param {Buffer} pdfBuffer - contenu du PDF
 * @param {string} filename - nom du fichier joint
 */
exports.sendPdf = async (to, subject, text, pdfBuffer, filename = "document.pdf") => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
    attachments: [
      {
        filename,
        content: pdfBuffer,
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};
