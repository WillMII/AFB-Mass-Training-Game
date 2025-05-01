# AFB Mass Training Game

A web-based training platform designed for Warner Robins Air Force Base to transform static PowerPoint modules (STINFO, Records Management, No Fear Act) into interactive, escape-room style learning experiences.

---

## Features

- **User Management:** Secure account creation, login, and role-based access (trainee vs. training manager)
- **Progress Tracking:** Real-time module completion status and history
- **Certificate Generation:** Downloadable PDF certificates upon module completion
- **Responsive UI:** Built with React.js and React-Bootstrap for a seamless experience

---

## Tech Stack

- **Game Engine:** Unity (C#)
- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** MySQL

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-org/afb-mass-training-game.git
cd afb-mass-training-game
```

### 2. Environment Variables

In the root of the project create a `.env` file:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASS=your_mysql_password
DB_NAME=afb_training
JWT_SECRET=your_jwt_secret
```

### 3. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend (React + Bootstrap)

```bash
cd ../frontend
npm install
npm install react-bootstrap bootstrap
```

> **Tip:** In `src/index.js` (or `App.js`) of your React app, import the Bootstrap stylesheet:
> ```js
> import 'bootstrap/dist/css/bootstrap.min.css';
> ```

---

### 4. Start MySQL

#### macOS (Homebrew)

```bash
brew services start mysql
```

#### Windows

1. Open **Services** (`Win + R` → `services.msc`)
2. Find **MySQL** → Right-click → **Start**

---

### 5. Run the App

#### Backend

```bash
cd backend
node server.js
```
Server will listen on **http://localhost:8000**.

#### Frontend

```bash
cd frontend
npm start
```
React app will open at **http://localhost:3000**.

---

## API Overview

| Method | Endpoint                     | Description                                   |
| ------ | ---------------------------- | --------------------------------------------- |
| POST   | `/api/create-account`        | Register a new user                           |
| POST   | `/api/login`                 | Authenticate and receive JWT cookie           |
| POST   | `/api/logout`                | Clear the auth cookie (log out)               |
| GET    | `/api/user`                  | Retrieve current user profile                 |
| GET    | `/api/user-progress`         | Fetch all users’ progress (manager view)      |
| GET    | `/api/progress-center`       | Fetch modules and progress for logged-in user |
| GET    | `/api/download-certificate`  | Download completion certificate PDF           |
| DELETE | `/api/user/delete`           | Delete current user account                   |
| PUT    | `/api/update-manager-status` | Update a user’s `training_manager` flag       |
| PUT    | `/api/user/password`         | Update current user’s password                |

---

## Database Schema (High-Level)

### Users Table

| Column Name       | Data Type               | Constraints                  |
| ----------------- | ----------------------- | ---------------------------- |
| user_id           | INT                     | PRIMARY KEY, AUTO_INCREMENT  |
| email             | VARCHAR(100)            | UNIQUE, NOT NULL             |
| first_name        | VARCHAR(50)             | NOT NULL                     |
| last_name         | VARCHAR(50)             | NOT NULL                     |
| squadron          | VARCHAR(50)             | NULLABLE                     |
| flight            | ENUM('A','B','C','N/A') | DEFAULT 'N/A', NOT NULL      |
| password_hash     | VARCHAR(255)            | NOT NULL                     |
| training_manager  | BOOLEAN                 | DEFAULT FALSE, NOT NULL      |

### Modules Table

| Column Name | Data Type    | Constraints                  |
| ----------- | ------------ | ---------------------------- |
| module_id   | INT          | PRIMARY KEY, AUTO_INCREMENT  |
| name        | VARCHAR(100) | NOT NULL                     |
| description | TEXT         | NULLABLE                     |

### Records Table

| Column Name       | Data Type | Constraints                       |
| ----------------- | --------- | --------------------------------- |
| records_id        | INT       | PRIMARY KEY, AUTO_INCREMENT       |
| user_id           | INT       | FOREIGN KEY → users(user_id)      |
| module_id         | INT       | FOREIGN KEY → modules(module_id)  |
| completion_status | BOOLEAN   | DEFAULT FALSE, NOT NULL           |

### Sessions Table

| Column Name    | Data Type     | Constraints                                 |
| -------------- | ------------- | ------------------------------------------- |
| sessions_id    | INT           | PRIMARY KEY, AUTO_INCREMENT                 |
| user_id        | INT           | FOREIGN KEY → users(user_id)                |
| session_token  | VARCHAR(255)  | UNIQUE, NOT NULL                            |
| created_at     | TIMESTAMP     | DEFAULT CURRENT_TIMESTAMP                   |
| expires_at     | TIMESTAMP     | NOT NULL                                    |

### Game Progress Table

| Column Name        | Data Type | Constraints                      |
| ------------------ | --------- | -------------------------------- |
| game_progress_id   | INT       | PRIMARY KEY, AUTO_INCREMENT      |
| user_id            | INT       | FOREIGN KEY → users(user_id)     |
| module_id          | INT       | FOREIGN KEY → modules(module_id) |
| stage              | INT       | NOT NULL                         |
| progress           | FLOAT     | DEFAULT 0.0                      |
| date_completed     | TIMESTAMP | NULLABLE                         |

### Clue Bank Table

| Column Name | Data Type | Constraints                       |
| ----------- | --------- | --------------------------------- |
| clue_id     | INT       | PRIMARY KEY, AUTO_INCREMENT       |
| module_id   | INT       | FOREIGN KEY → modules(module_id)  |
| clue_text   | TEXT      | NOT NULL                          |

### Quiz Question Bank Table

| Column Name  | Data Type | Constraints                       |
| ------------ | --------- | --------------------------------- |
| question_id  | INT       | PRIMARY KEY, AUTO_INCREMENT       |
| module_id    | INT       | FOREIGN KEY → modules(module_id)  |
| question     | TEXT      | NOT NULL                          |
| answer       | TEXT      | NOT NULL                          |

---

## Technology Overview

**MySQL**
A relational database system. We store users, modules, progress records, and quiz/clue data in structured tables and leverage SQL to query them efficiently.

**Node.js**
A JavaScript runtime built on Chrome’s V8 engine. We use Node for our backend server because it lets us write our API in JavaScript, handle asynchronous I/O easily, and share code patterns with the frontend.

**Express**
A minimal, flexible Node.js web framework. Express provides routing, middleware support, and a simple way to build RESTful endpoints (`app.get`, `app.post`, etc.) for user authentication, progress tracking, PDF generation, and more.

**React.js**
A component-based JavaScript library for building interactive user interfaces. React lets us split our frontend into reusable pieces (cards, forms, tables) and manage state easily as users log in, progress through modules, and view certificates.

**Bootstrap & React-Bootstrap**
A popular CSS framework that provides responsive grid layouts and pre-styled components (buttons, cards, navbars). We use the React-Bootstrap library to integrate those styles directly into our React components, speeding up UI development and ensuring consistency.

**Unity (WebGL)**
Our game engine for the interactive escape-room modules. We build each training scenario in Unity and export a lightweight **WebGL** build that runs in the browser. Unity handles graphics, physics, and input, letting us focus on quiz logic and immersive puzzles.

---
