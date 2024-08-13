const {User} = require('../model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class UserController {
    async register(req, res) {
        const { username, mobile, email, password, role } = req.body;
        try {
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                return res.status(400).json({ error: 'Username or email already exists' });
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                username,
                mobile,
                email,
                password: hashedPassword,
                role
            });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully',
                newUser,
             });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }
            const token = jwt.sign({ userID: user._id, role: user.user }, 'es2323', { expiresIn: '1h' });
    
            res.status(200).json({
                message: 'Logged in successfully',
                token,
                user: {
                    username: user.username,
                    mobile: user.mobile,
                    email: user.email
                }
            });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async protectedRoute(req, res) {
        res.json({ message: "This is a protected route", });
    }
}
module.exports = new UserController();