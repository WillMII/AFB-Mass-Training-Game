# AFB Mass Training Game

A web-based training platform designed for Warner Robins Air Force Base to transform static PowerPoint modules (STINFO, Records Management, No Fear Act) into interactive, self-guided learning experiences.

## Features
- **User Management:** Secure account creation, login, and role-based access (trainee vs. training manager)
- **Progress Tracking:** Real-time module completion status and history
- **Certificate Generation:** Downloadable PDF certificates upon module completion
- **Responsive UI:** Built with React.js components for a seamless user experience

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** MySQL
- **Authentication:** JSON Web Tokens (JWT)

## Installation & Setup
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
   npm start
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
- **Users** (`user_id`, `email`, `first_name`, `last_name`, `hashed_password`, `training_manager`)
- **Modules** (`module_id`, `name`, `description`)
- **Records** (`records_id`, `user_id`, `module_id`, `completion_status`, `date_completed`)
- **Certificates** (`certificate_id`, `user_id`, `module_id`, `issued_date`)

## Contributing
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m "Add new feature"`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a pull request
