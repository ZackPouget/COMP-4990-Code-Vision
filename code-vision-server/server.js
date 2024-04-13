const express = require('express');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors({ origin: 'http://localhost:1212' }));

const db = new sqlite3.Database('user_info.db', (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database');
        db.run(`CREATE TABLE IF NOT EXISTS information (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT,
            email TEXT,
            firstname TEXT,
            lastname TEXT
        )`);
    }
});

app.post('/server/Signup', async (req, res) => {
    const { username, password, email, firstname, lastname } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            'INSERT INTO information (username, password, email, firstname, lastname) VALUES (?, ?, ?, ?, ?)',
            [username, hashedPassword, email, firstname, lastname],
            function (err) {
                if (err) {
                    console.error(err.message);
                    res.status(500).json({ message: 'Internal server error' });
                } else {
                    res.status(201).json({ message: 'Signup successful' });
                }
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/server/Login', async (req, res) => {
    const { username, password } = req.body;

    try {
        db.get('SELECT * FROM information WHERE username = ?', [username], async (error, row) => {
            if (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            } else if (row) {
                const passwordMatch = await bcrypt.compare(password, row.password);
                if (passwordMatch) {
                    res.status(200).json({ message: 'Login successful' });
                } else {
                    res.status(401).json({ message: 'Invalid username or password' });
                }
            } else {
                res.status(401).json({ message: 'Invalid username or password' });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/server/UserInfo', async (req, res) => {
    const { username, password } = req.body;

    try {
        db.get('SELECT * FROM information WHERE username = ?', [username], async (error, row) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ message: 'Internal server error' });
            } else if (row) {
                try {
                    const passwordMatch = await bcrypt.compare(password, row.password);
                    if (passwordMatch) {
                        const userInfo = {
                            username: row.username,
                            firstname: row.firstname,
                            lastname: row.lastname
                        };
                        return res.status(200).json(userInfo);
                    } else {
                        return res.status(401).json({ message: 'Invalid username or password' });
                    }
                } catch (bcryptError) {
                    console.error('bcrypt error:', bcryptError);
                    return res.status(500).json({ message: 'Internal server error' });
                }
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        });
    } catch (tryCatchError) {
        console.error('Server error:', tryCatchError);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});