require("dotenv").config();

const express = require("express");

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

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "onboarding@resend.dev",
                to: "afraholamiposi@gmail.com",
                subject: `New contact message from ${name}`,
                text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Resend error:", data);

            return res.status(500).json({
                message: "There was a problem sending your message."
            });
        }

        console.log("Email sent:", data);

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
