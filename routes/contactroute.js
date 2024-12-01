import express from 'express';
import Contact from '../models/Contact.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();
const app = express();

app.post('/contact', async (req, res) => {
   
    try {
        const { name, email, message } = req.body;

        const exist = await Contact.findOne({ email, message });
        if (exist) {
            return res.send({ success: false, error: 'You have already contacted us with the same query.' });
        }

        const result = await Contact.create({ name, email, message });

        // nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Veer Consultancy',
            html: `
                <h2>Welcome to Veer Consultancy</h2>
                <p>Hello ${name},</p>
                <p>Thank you for contacting our consultancy. We are excited to have you on board!</p>
                <p>Best regards,</p>
                <p>Veer Consultancy</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        res.json({ success: true, message: 'Thanks for contacting,we will get back to you soon.' });
        console.log(result);

    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).send('Internal server error occurred');
    }
});

app.get('/contacts', async (req, res) => {
   
    try {
        const contacts = await Contact.find();

        res.json({ contacts })

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
});

app.delete('/contact/:id', async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) {
            return res.status(404).json({ success: false, error: "contact not found" });
        }
        res.status(200).json({ success: true, message: "Data Deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
});

export default app;
