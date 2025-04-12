const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

function generateToken(user, expiresIn = "1h") {
    return jwt.sign(
        {
            id: user.user_id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            squadron: user.squadron,
            flight: user.flight,
            training_manager: user.training_manager
        },
        SECRET_KEY,
        { expiresIn }
    );
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY);
}

module.exports = { generateToken, verifyToken };
