const bcrypt = require('bcryptjs');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { sendResetEmail } = require('../utils/email');

const registerUser = (req, res) => {
  const { firstName, lastName, email, squadron, flight, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });

    const sql = 'INSERT INTO users (first_name, last_name, email, squadron, flight, password_hash) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, email, squadron, flight, hash], (error, result) => {
      if (error) return res.status(500).json({ message: 'Error registering user' });

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

const forgotPassword = (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Email is required" });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (results.length === 0) {
      return res.status(404).json({ error: "No user with that email" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });
    const resetLink = `http://localhost:3000/reset-password/${token}`;

    try {
      const { simulated, previewUrl } = await sendResetEmail(email, resetLink);
      if (simulated) {
        console.log("Simulated email preview:", previewUrl);
        res.status(200).json({ message: "Reset link simulated successfully." });
      } else {
        console.log("Real email sent.");
        res.status(200).json({ message: "Reset link sent successfully." });
      }
    } catch (mailErr) {
      console.error("Email failed:", mailErr);
      res.status(500).json({ error: "Failed to send email" });
    }
  });
};

const resetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) return res.status(400).json({ error: "Password is required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({ error: "Invalid or expired token" });

    const email = decoded.email;

    bcrypt.hash(password, 10, (err2, hash) => {
      if (err2) return res.status(500).json({ error: "Error hashing password" });

      db.query("UPDATE users SET password_hash = ? WHERE email = ?", [hash, email], (err3) => {
        if (err3) return res.status(500).json({ error: "Database error" });

        res.status(200).json({ message: "Password updated successfully" });
      });
    });
  });
};

module.exports = { registerUser, forgotPassword, resetPassword };