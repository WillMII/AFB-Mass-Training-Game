/*
Manages MySQL connection, ensures the database & tables exist, and exports the connection for use in server.js.
*/
const mysql = require("mysql2");

// Define the database name
const databaseName = "Mass_Training_Database";

// Create a connection without selecting a database first
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your MySQL password", // your MySQL password
});

// Connect to MySQL and ensure the database exists
db.connect(err => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to MySQL");

    // Create the database if it doesn't exist
    db.query(`CREATE DATABASE IF NOT EXISTS ${databaseName}`, (err) => {
        if (err) {
            console.error("Error creating database:", err);
            return;
        }
        console.log(`Database '${databaseName}' is ready`);

        // Switch to the newly created database
        db.changeUser({ database: databaseName }, err => {
            if (err) {
                console.error("Error switching to database:", err);
                return;
            }
            console.log(`Using database: ${databaseName}`);

            // Ensure the Users table exists
            const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    first_name VARCHAR(255) NOT NULL,
                    last_name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    squadron VARCHAR(255) DEFAULT NULL,
                    flight ENUM('A', 'B', 'C', 'N/A') DEFAULT 'N/A',
                    password_hash VARCHAR(255) NOT NULL
                );
            `;

            db.query(createUsersTable, (err) => {
                if (err) {
                    console.error("Error creating Users table:", err);
                } else {
                    console.log("Users table is ready");
                }
            });

            // Ensure the User Progress table exists
            const createUserProgressTable = `
                CREATE TABLE IF NOT EXISTS user_progress (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    first_name VARCHAR(50) NOT NULL,
                    last_name VARCHAR(50) NOT NULL,
                    squadron VARCHAR(50) DEFAULT 'N/A',
                    flight ENUM('A', 'B', 'C', 'N/A') DEFAULT 'N/A',
                    module1 INT CHECK (module1 BETWEEN 0 AND 100) DEFAULT 0,
                    module2 INT CHECK (module2 BETWEEN 0 AND 100) DEFAULT 0,
                    module3 INT CHECK (module3 BETWEEN 0 AND 100) DEFAULT 0
                );
            `;

            db.query(createUserProgressTable, (err) => {
                if (err) {
                    console.error("Error creating User Progress table:", err);
                } else {
                    console.log("User Progress table is ready");
                }
            });
        });
    });
});

module.exports = db;
