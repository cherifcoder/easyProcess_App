// services/demandeService.js
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const { getModelByType } = require('../utils/modelMapper');

exports.traiterDemande = async (typeDemande, identifiant) => {
  // 1. Récupération MongoDB
  const Model = getModelByType(typeDemande);
  const demande = await Model.findOne({ identifiant });

  if (!demande) throw new Error("Demande introuvable");

  // 2. Génération HTML via EJS
  const templatePath = path.join(__dirname, `../views/templates/${typeDemande}.ejs`);
  const html = await ejs.renderFile(templatePath, { demande });

  // 3. Conversion PDF avec Puppeteer
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // utile sur certains serveurs
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

 // Conversion PDF avec Puppeteer
const pdfUint8Array = await page.pdf({ format: 'A4' });
await browser.close();

// Convertir en Buffer pour Mongoose
const pdfBuffer = Buffer.from(pdfUint8Array);

// Sauvegarde PDF + changement de statut
demande.pdfBuffer = pdfBuffer;
demande.statut = "Signee";
await demande.save();


  // 5. Envoi par email (Gmail mot de passe d’application)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: demande.email,
    subject: `Votre ${typeDemande}`,
    text: `Veuillez trouver ci-joint votre ${typeDemande}.`,
    attachments: [{ filename: `${typeDemande}-${identifiant}.pdf`, content: pdfBuffer }]
  });

  return pdfBuffer;
};
