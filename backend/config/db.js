require("dotenv").config();

/*
Manages MySQL connection, ensures the database & tables exist, and exports the connection for use in server.js.
*/
const mysql = require("mysql2");

// Define the database name
const databaseName = "Mass_Training_Database";

// Create a connection without selecting a database first
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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

            // Create Users Table
            const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    user_id INT AUTO_INCREMENT PRIMARY KEY,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    first_name VARCHAR(50) NOT NULL,
                    last_name VARCHAR(50) NOT NULL,
                    squadron VARCHAR(50) DEFAULT NULL,
                    flight ENUM('A', 'B', 'C', 'N/A') DEFAULT 'N/A' NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    training_manager BOOLEAN DEFAULT FALSE NOT NULL
                );
            `;

            // Create Modules Table
            const createModulesTable = `
                CREATE TABLE IF NOT EXISTS modules (
                    module_id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    description TEXT NULL
                );
            `;

            // Create Records Table
            const createRecordsTable = `
                CREATE TABLE IF NOT EXISTS records (
                    records_id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT,
                    module_id INT,
                    completion_status BOOLEAN DEFAULT FALSE NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(user_id),
                    FOREIGN KEY (module_id) REFERENCES modules(module_id)
                );
            `;

            // Create Sessions Table
            const createSessionsTable = `
                CREATE TABLE IF NOT EXISTS sessions (
                    sessions_id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT,
                    session_token VARCHAR(255) UNIQUE NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    expires_at TIMESTAMP NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(user_id)
                );
            `;

            // Create Game Progress Table
            const createGameProgressTable = `
                CREATE TABLE IF NOT EXISTS game_progress (
                    game_progress_id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT,
                    module_id INT,
                    stage INT NOT NULL,
                    progress FLOAT DEFAULT 0.0,
                    date_completed TIMESTAMP NULL,
                    FOREIGN KEY (user_id) REFERENCES users(user_id),
                    FOREIGN KEY (module_id) REFERENCES modules(module_id)
                );
            `;

            // Create Clue Bank Table
            const createClueBankTable = `
                CREATE TABLE IF NOT EXISTS clue_bank (
                    clue_id INT AUTO_INCREMENT PRIMARY KEY,
                    module_id INT,
                    clue_text TEXT NOT NULL,
                    FOREIGN KEY (module_id) REFERENCES modules(module_id)
                );
            `;

            // Create Quiz Question Bank Table
            const createQuizQuestionBankTable = `
                CREATE TABLE IF NOT EXISTS quiz_question_bank (
                    question_id INT AUTO_INCREMENT PRIMARY KEY,
                    module_id INT,
                    question TEXT NOT NULL,
                    answer TEXT NOT NULL,
                    FOREIGN KEY (module_id) REFERENCES modules(module_id)
                );
            `;

            const createSTINFOProgressTable = `
                CREATE TABLE IF NOT EXISTS stinfoprogress (
                    email varchar(100) NOT NULL,
                    clue1clicked tinyint DEFAULT '0',
                    clue2clicked tinyint DEFAULT '0',
                    clue3clicked tinyint DEFAULT '0',
                    clue4clicked tinyint DEFAULT '0',
                    clue4completed tinyint DEFAULT '0',
                    clue5clicked tinyint DEFAULT '0',
                    clue6clicked tinyint DEFAULT '0',
                    clue7clicked tinyint DEFAULT '0',
                    clue8clicked tinyint DEFAULT '0',
                    clue8completed tinyint DEFAULT '0',
                    clue9clicked tinyint DEFAULT '0',
                    clue10clicked tinyint DEFAULT '0',
                    clue11clicked tinyint DEFAULT '0',
                    quizcompleted tinyint DEFAULT '0',
                    PRIMARY KEY (email)
                );
            `;

            const createNoFearProgressTable = `
                CREATE TABLE IF NOT EXISTS nofearprogress (
                    email varchar(100) NOT NULL,
                    clue1clicked tinyint DEFAULT '0',
                    clue1completed tinyint DEFAULT '0',
                    clue2clicked tinyint DEFAULT '0',
                    clue2completed tinyint DEFAULT '0',
                    clue3clicked tinyint DEFAULT '0',
                    clue4clicked tinyint DEFAULT '0',
                    clue4completed tinyint DEFAULT '0',
                    clue5clicked tinyint DEFAULT '0',
                    clue5completed tinyint DEFAULT '0',
                    clue6clicked tinyint DEFAULT '0',
                    clue7clicked tinyint DEFAULT '0',
                    clue8clicked tinyint DEFAULT '0',
                    clue9clicked tinyint DEFAULT '0',
                    clue10clicked tinyint DEFAULT '0',
                    clue11clicked tinyint DEFAULT '0',
                    clue12clicked tinyint DEFAULT '0',
                    clue13clicked tinyint DEFAULT '0',
                    clue14clicked tinyint DEFAULT '0',
                    clue15clicked tinyint DEFAULT '0',
                    clue16clicked tinyint DEFAULT '0',
                    clue17clicked tinyint DEFAULT '0',
                    clue18clicked tinyint DEFAULT '0',
                    quizcompleted tinyint DEFAULT '0',
                    PRIMARY KEY (email)
                );
            `;

            const createRecordsProgressTable = 
                `CREATE TABLE IF NOT EXISTS nofearprogress (
                    email varchar(100) NOT NULL,
                    clue1clicked tinyint DEFAULT '0',
                    clue2clicked tinyint DEFAULT '0',
                    clue2completed tinyint DEFAULT '0',
                    clue3clicked tinyint DEFAULT '0',
                    clue4clicked tinyint DEFAULT '0',
                    clue4completed tinyint DEFAULT '0',
                    clue5clicked tinyint DEFAULT '0',
                    clue6clicked tinyint DEFAULT '0',
                    clue7clicked tinyint DEFAULT '0',
                    clue8clicked tinyint DEFAULT '0',
                    clue8completed tinyint DEFAULT '0',
                    quizcompleted tinyint DEFAULT '0',
                    PRIMARY KEY (email)
                );
            `;

            // Execute table creation queries in order
            const tables = [
                createUsersTable,
                createModulesTable,
                createRecordsTable,
                createSessionsTable,
                createGameProgressTable,
                createClueBankTable,
                createQuizQuestionBankTable,
                createSTINFOProgressTable,
                createNoFearProgressTable,
                createRecordsProgressTable
            ];

            // Execute each table creation query in the `tables` array
            tables.forEach((query, index) => {
                db.query(query, (err) => {
                    if (err) {
                        console.error("Error creating table:", err);
                    } else {
                        const tableNames = [
                            "users",
                            "modules",
                            "records",
                            "sessions",
                            "game_progress",
                            "clue_bank",
                            "quiz_question_bank",
                            "stinfo_progress",
                            "no_fear_progress",
                            "records_progress"
                        ];
                        console.log(`'${tableNames[index]}' created.`);
                    }
                });
            });
        });
    });
});

module.exports = db;
