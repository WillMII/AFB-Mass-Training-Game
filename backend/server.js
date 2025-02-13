/*
Handles the backend server using Express, defines API routes, and listens for incoming requests.
*/
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const db = require("./config/db");  // Import the database connection

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

// Create Account Route
app.post("/api/createAccount", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
                 [name, email, hashedPassword], 
                 (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.sqlMessage });
            }
            res.status(201).json({ message: "Account created successfully" });
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
