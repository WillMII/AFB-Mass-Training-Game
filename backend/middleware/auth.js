const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

function authenticateToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });

        req.user = user; 
        next();
    });
}

module.exports = authenticateToken;
