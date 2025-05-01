# AFB Mass Training Game

A web-based training platform designed for Warner Robins Air Force Base to transform static PowerPoint modules (STINFO, Records Management, No Fear Act) into interactive, self-guided learning experiences.

## Features
- **User Management:** Secure account creation, login, and role-based access (trainee vs. training manager)
- **Progress Tracking:** Real-time module completion status and history
- **Certificate Generation:** Downloadable PDF certificates upon module completion
- **Responsive UI:** Built with React.js components for a seamless user experience

## Tech Stack
- **Game Engine:** Unity (C#)
- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** MySQL

## Installation & Setup & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/afb-mass-training-game.git
   cd afb-mass-training-game
   ```
2. **Environment Variables**
   Create a `.env` file in the root with:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASS=your_mysql_password
   DB_NAME=afb_training
   JWT_SECRET=your_jwt_secret
   ```
3. **Install Dependencies**
   ```bash
   # Backend
   cd backend && npm install

   # Frontend
   cd ../frontend && npm install
   ```

## Running the App
1. **Start MySQL** (ensure your `afb_training` database is created)
2. **Backend**
   ```bash
   cd backend
   node server.js
   ```
3. **Frontend**
   ```bash
   cd frontend
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Overview
- `POST /api/create-account` — Register a new user
- `POST /api/login` — Authenticate and receive JWT cookie
- `GET /api/user` — Retrieve current user profile
- `GET /api/progress-center` — Fetch modules and user progress
- `GET /api/download-certificate` — Download completion certificate PDF

## Database Schema (High-Level)

**Users Table:**
| Column Name      | Data Type              | Constraints                                  |
|------------------|------------------------|----------------------------------------------|
| user_id          | INT                    | PRIMARY KEY, AUTO_INCREMENT                  |
| email            | VARCHAR(100)           | UNIQUE, NOT NULL                             |
| first_name       | VARCHAR(50)            | NOT NULL                                     |
| last_name        | VARCHAR(50)            | NOT NULL                                     |
| squadron         | VARCHAR(50)            | NULLABLE                                     |
| flight           | ENUM('A', 'B', 'C', 'N/A') | DEFAULT 'N/A', NOT NULL               |
| password_hash    | VARCHAR(255)           | NOT NULL                                     |
| training_manager | BOOLEAN                | DEFAULT FALSE, NOT NULL                      |

**Modules Table:**
| Column Name | Data Type    | Constraints                |
|-------------|--------------|----------------------------|
| module_id   | INT          | PRIMARY KEY, AUTO_INCREMENT|
| name        | VARCHAR(100) | NOT NULL                   |
| description | TEXT         | NULLABLE                   |

**Records Table:**
| Column Name       | Data Type | Constraints                              |
|-------------------|-----------|------------------------------------------|
| records_id        | INT       | PRIMARY KEY, AUTO_INCREMENT              |
| user_id           | INT       | FOREIGN KEY REFERENCES users(user_id)    |
| module_id         | INT       | FOREIGN KEY REFERENCES modules(module_id)|
| completion_status | BOOLEAN   | DEFAULT FALSE, NOT NULL                 |

**Sessions Table:**
| Column Name   | Data Type   | Constraints                                  |
|---------------|-------------|----------------------------------------------|
| sessions_id   | INT         | PRIMARY KEY, AUTO_INCREMENT                  |
| user_id       | INT         | FOREIGN KEY REFERENCES users(user_id)        |
| session_token | VARCHAR(255)| UNIQUE, NOT NULL                             |
| created_at    | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP                   |
| expires_at    | TIMESTAMP   | NOT NULL                                     |

**Game Progress Table:**
| Column Name      | Data Type | Constraints                                |
|------------------|-----------|--------------------------------------------|
| game_progress_id | INT       | PRIMARY KEY, AUTO_INCREMENT                |
| user_id          | INT       | FOREIGN KEY REFERENCES users(user_id)      |
| module_id        | INT       | FOREIGN KEY REFERENCES modules(module_id)  |
| stage            | INT       | NOT NULL                                   |
| progress         | FLOAT     | DEFAULT 0.0                                |
| date_completed   | TIMESTAMP | NULLABLE                                   |

**Clue Bank Table:**
| Column Name | Data Type | Constraints                                  |
|-------------|-----------|----------------------------------------------|
| clue_id     | INT       | PRIMARY KEY, AUTO_INCREMENT                  |
| module_id   | INT       | FOREIGN KEY REFERENCES modules(module_id)    |
| clue_text   | TEXT      | NOT NULL                                     |

**Quiz Question Bank Table:**
| Column Name | Data Type | Constraints                                          |
|-------------|-----------|------------------------------------------------------|
| question_id | INT       | PRIMARY KEY, AUTO_INCREMENT                          |
| module_id   | INT       | FOREIGN KEY REFERENCES modules(module_id)            |
| question    | TEXT      | NOT NULL                                             |
| answer      | TEXT      | NOT NULL                                             |
