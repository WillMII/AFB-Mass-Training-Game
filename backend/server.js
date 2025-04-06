/*
Handles the backend server using Express, defines API routes, and listens for incoming requests.
*/
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const db = require("./config/db");  // Import the database connection
const pdfRoutes = require("./routes/pdfRoutes");  // Import the PDF routes


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

// === PDF Download Route ===
app.use("/api", pdfRoutes);

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
                id: user.user_id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                squadron: user.squadron,
                flight: user.flight,
                training_manager: user.training_manager
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

//user-progress route for displaying all trainees' progress
app.get("/api/user-progress", (req, res) => {
    const { squadron, flight, search, module1Progress, module2Progress, module3Progress, all_modules } = req.query;
    let sql = `
        SELECT u.user_id, u.first_name, u.last_name, u.squadron, u.flight,
               MAX(CASE WHEN m.name = 'STINFO' THEN gp.progress ELSE 0 END) AS module1,
               MAX(CASE WHEN m.name = 'Records Management' THEN gp.progress ELSE 0 END) AS module2,
               MAX(CASE WHEN m.name = 'No FEAR Act' THEN gp.progress ELSE 0 END) AS module3
        FROM users u
        LEFT JOIN game_progress gp ON u.user_id = gp.user_id
        LEFT JOIN modules m ON gp.module_id = m.module_id
        WHERE 1=1
    `;

    const queryParams = [];
    
    if (squadron) {
        sql += " AND u.squadron = ?";
        queryParams.push(squadron);
    }
    if (flight) {
        sql += " AND u.flight = ?";
        queryParams.push(flight);
    }
    if (search) {
        sql += " AND (u.first_name LIKE ? OR u.last_name LIKE ?)";
        queryParams.push(`%${search}%`, `%${search}%`);
    }

    sql += " GROUP BY u.user_id, u.first_name, u.last_name, u.squadron, u.flight";

    // Add HAVING conditions based on module progress
    let havingConditions = [];
    if (module1Progress) {
        if (module1Progress === "complete") havingConditions.push("MAX(CASE WHEN m.name = 'STINFO' THEN gp.progress ELSE 0 END) = 100");
        if (module1Progress === "not_complete") havingConditions.push("MAX(CASE WHEN m.name = 'STINFO' THEN gp.progress ELSE 0 END) < 100");
    }
    if (module2Progress) {
        if (module2Progress === "complete") havingConditions.push("MAX(CASE WHEN m.name = 'Records Management' THEN gp.progress ELSE 0 END) = 100");
        if (module2Progress === "not_complete") havingConditions.push("MAX(CASE WHEN m.name = 'Records Management' THEN gp.progress ELSE 0 END) < 100");
    }
    if (module3Progress) {
        if (module3Progress === "complete") havingConditions.push("MAX(CASE WHEN m.name = 'No FEAR Act' THEN gp.progress ELSE 0 END) = 100");
        if (module3Progress === "not_complete") havingConditions.push("MAX(CASE WHEN m.name = 'No FEAR Act' THEN gp.progress ELSE 0 END) < 100");
    }
    if (all_modules) {
        if (all_modules === "complete") {
            havingConditions.push("MAX(CASE WHEN m.name = 'STINFO' THEN gp.progress ELSE 0 END) = 100");
            havingConditions.push("MAX(CASE WHEN m.name = 'Records Management' THEN gp.progress ELSE 0 END) = 100");
            havingConditions.push("MAX(CASE WHEN m.name = 'No FEAR Act' THEN gp.progress ELSE 0 END) = 100");
        }
        if (all_modules === "not_complete") {
            havingConditions.push("MAX(CASE WHEN m.name = 'STINFO' THEN gp.progress ELSE 0 END) < 100");
            havingConditions.push("MAX(CASE WHEN m.name = 'Records Management' THEN gp.progress ELSE 0 END) < 100");
            havingConditions.push("MAX(CASE WHEN m.name = 'No FEAR Act' THEN gp.progress ELSE 0 END) < 100");
        } 
    }

    if (havingConditions.length > 0) {
        sql += " HAVING " + havingConditions.join(" AND ");
    }

    db.query(sql, queryParams, (err, results) => {
        if (err) {
            console.error("Database error:", err.sqlMessage || err);
            return res.status(500).json({ error: "Database query failed", details: err.sqlMessage || err });
        }
        res.json(results);
    });
});

// for user's information
app.get("/api/user", authenticateUser, (req, res) => {
    const sql = "SELECT first_name, last_name, email, squadron, flight, training_manager FROM users WHERE email = ?";
    
    db.query(sql, [req.session.user.email], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database query failed" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = results[0];

        res.json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            squadron: user.squadron,
            flight: user.flight,
            isManager: user.isManager,
        });
    });
});

//User-Management Page
app.get("/api/user-list", (req, res) => {
    const query = `
      SELECT 
        user_id AS id, first_name, last_name, squadron, flight, training_manager AS manager 
      FROM users
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching user list:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.json(results);
    });
  });

// Update Manager Status Route
  app.put("/api/update-manager-status", (req, res) => {
    const { userId, newStatus } = req.body;
  
    if (!userId || typeof newStatus !== "boolean") {
      return res.status(400).json({ error: "Invalid request. User ID and new status are required." });
    }
  
    const sql = "UPDATE users SET training_manager = ? WHERE user_id = ?";
    db.query(sql, [newStatus, userId], (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Failed to update manager status" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ message: "Manager status updated successfully" });
    });
  });

  // Update User Password Route
  app.put("/api/user/password", authenticateUser, async (req, res) => {
    const userId = req.session.user ? req.session.user.id : null;

    // Check if userId is undefined or null
    if (!userId) {
        console.log("Error: User ID not found in session");
        return res.status(400).json({ error: "User ID not found in session" });
    }

    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "UPDATE users SET password_hash = ? WHERE user_id = ?",
            [hashedPassword, userId],
            (err, result) => {
                if (err) {
                    console.error("Error updating password:", err);
                    return res.status(500).json({ error: "Database error" });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: "User not found" });
                }

                res.status(200).json({ message: "Password updated successfully" });
            }
        );
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
