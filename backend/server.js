require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        return res.sendStatus(204);
    }

    next();
});

// Email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Test route
app.get("/", (req, res) => {
    res.send("JobConnect backend is working!");
});

// Contact form
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body;

    console.log("New contact message:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New contact message from ${name}`,
        text: `
Name: ${name}
Email: ${email}

Message:
${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);

        res.json({
            message: "Your message was sent successfully!"
        });
    } catch (error) {
        console.error("Email error:", error);

        res.status(500).json({
            message: "There was a problem sending your message."
        });
    }
});

const PORT = process.env.PORT || 3000;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
});
