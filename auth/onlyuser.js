const jwt = require('jsonwebtoken');
const { User } = require('../model/usermodel');

async function authMiddleware(req, res, next) {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Authorization token missing' });
    }
    try {
        const decoded = jwt.verify(token, 'es2323');
        if (!decoded || !decoded.userID) {
            throw new Error('Invalid token payload');
        }
        console.log(decoded);
        const user = await User.findOne({ _id: decoded.userID });
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }
       /*  if (user.role === 'user') && (user.role !== 'admin'){
            return res.status(403).json({ error: 'role required.' });
        } */
            if ((user.role === 'admin') || (user.role === 'user')){
                req.user = user;
                next();
            } else {
                return res.status(403).json({ error: 'Access forbidden' });
            }
    } catch (err) {
        console.error('JWT verification error:', err);
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = authMiddleware;
