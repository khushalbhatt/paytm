import jsonwebtoken from 'jsonwebtoken';
import JWT_Secret from '../config.js';

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(400).send("Token not found");
        return;
    }
    const data = token.split(" ")[1];
    const decoded = jsonwebtoken.verify(data, JWT_Secret);
    req.userId = decoded.userId;
    next();
}; 