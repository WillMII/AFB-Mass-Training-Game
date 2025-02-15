/*
Handles the backend server using Express, defines API routes, and listens for incoming requests.
*/
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const db = require("./config/db");  // Import the database connection

const app = express();
const PORT = 8000;

const session = require("express-session"); // Import express-session for session management

// Middleware
app.use(
    cors({
        origin: "http://localhost:3000", // Allow frontend origin
        credentials: true, // Allow cookies and authentication headers
        methods: "GET,POST,PUT,DELETE", // Allowed methods
        allowedHeaders: "Content-Type,Authorization", // Allowed headers
    })
);

app.use(express.json());


app.use(session({
    secret: "your_secret_key",  // Replace with a strong secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Create Account Route
app.post("/api/create-account", async (req, res) => {
    console.log("Received request:", req.body);  // debug

    const { firstName, lastName, email, squadron, flight, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        console.log("Missing fields!");  // debug
        return res.status(400).json({ error: "All required fields must be filled" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = "INSERT INTO users (first_name, last_name, email, squadron, flight, password_hash) VALUES (?, ?, ?, ?, ?, ?)";
        
        db.query(sql, [firstName, lastName, email, squadron, flight, hashedPassword], (err, result) => {
            if (err) {
                console.error("Database error:", err.sqlMessage);
                return res.status(500).json({ error: err.sqlMessage });
            }
            console.log("Account created successfully!");
            res.status(201).json({ message: "Account created successfully" });
        });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Login Route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Check if the user exists
        db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            const user = results[0];

            // Compare the entered password with the hashed password
            const isMatch = await bcrypt.compare(password, user.password_hash);

            if (!isMatch) {
                return res.status(401).json({ error: "Invalid email or password" });
            }

            // User authenticated successfully, create session (basic token logic)
            req.session.user = {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
            };

            res.status(200).json({
                message: "Login successful",
                user: req.session.user,
            });
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Logout Route
const authenticateUser = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Unauthorized. Please log in." });
    }
    next();
};

// Home Route after login authenticated (successful login)
app.get("/api/home", authenticateUser, (req, res) => {
    res.json({ message: `Welcome, ${req.session.user.firstName}!` });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
