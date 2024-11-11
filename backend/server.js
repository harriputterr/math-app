import express from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator'

const loginValidationMiddleware = [
    body('username').isAlphanumeric().withMessage('Username must be alphanumeric').trim().escape(),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long').trim().escape()
];

const app = express();
const port = 7777;

// Before 
// 1. Plain Text Storage
// 2. Credentials exposed on Client-Side because of insecure data storage.


// Now
// 1. Ecrypted password storage using bcrypt.
// 2. DB has been separated from the client side
const users = [
    { username: 'joe', password: '$2b$10$z7/hdYg4kc8BTJgFx.bZpOA8Fgp755G6Jqh1c0JCzVKXZ7a5.ilUO' },
    { username: 'bob', password: '$2b$10$cbt.ZtcfGKAIW.GLbpUCyOsOavbGO/6IlRDAjIH2nTBNPEKpA0Mmu' },
];

app.use(express.json());

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/login', loginValidationMiddleware, async (req, res) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { username, password } = req.body;
    const user = users.find(user => user.username === username);
    if (user) {

        // Doing Proper Authentication
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.status(200).json({ user });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});