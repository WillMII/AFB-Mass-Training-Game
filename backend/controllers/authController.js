const bcrypt = require('bcryptjs');
const db = require('../config/db');

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

module.exports = { registerUser };