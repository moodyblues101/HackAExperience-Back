"use strict";

const sgMail = require("@sendgrid/mail")

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


async function sendMailRegister(name, email, code) {
    const linkActivation = `http://localhost:3000/api/v1/users/activation?code=${code}`;

    const msg = {
        to: email,
        from: process.env.SENDGRID_FROM,
        subject: 'Welcome to Experiencias Q3 - HackAExperience',
        text: `Hi ${name}, to confirm account click here: ${linkActivation}`,
        html: `Hi ${name}, to confirm account <a href='${linkActivation}'>click here</a>`,
    };



    await sgMail.send(msg);


}

async function sendMailCorrectValidation(name, email) {

    const msg = {
        to: email,
        from: process.env.SENDGRID_FROM, // Use the email address or domain you verified above
        subject: "Experiencias Q3 (HackAExperience) - Account activated",
        text: `Hi ${name},\n your account was activated.`,
        html: `<h1>Hi ${name},</h1> your account was activated.`,
    };

    await sgMail.send(msg);
}

module.exports = {
    sendMailRegister,
    sendMailCorrectValidation,
};
