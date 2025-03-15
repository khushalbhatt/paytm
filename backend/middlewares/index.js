import jwt from 'jsonwebtoken';
import JWT_Secret from '../config.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(400).send("Token not found");
        return;
    }
    const words = token.split(' ');
    const jwtToken = words[1];
    const decoded = jwt.verify(jwtToken, JWT_Secret);
    console.log(decoded);
    req.userId = decoded.userId;
    next();
}; 