const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const fs = require('fs');

const app = express();
const port = 3000;

/* =====================
   Admin Credentials
===================== */
const ADMIN_USERNAME = 'admin123';
const ADMIN_PASSWORD = 'pass@123';

/* =====================
   Session Setup
===================== */
app.use(session({
    secret: 'admin_secret_key',
    resave: false,
    saveUninitialized: false
}));

/* =====================
   Body Parser
===================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

/* =====================
   MySQL Connection
===================== */
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'adn_academy'
});

db.connect(err => {
    if (err) console.error("❌ MySQL Error:", err);
    else console.log('✅ MySQL Connected');
});

/* =====================
   Multer Setup
===================== */
const uploadFolder = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadFolder),
    filename: (req, file, cb) => cb(null, Date.now() + '_' + file.originalname)
});
const upload = multer({ storage });

/* =====================
   Student Registration
===================== */
app.post('/register', upload.single('passing_certificate'), (req, res) => {
    const s = req.body;

    const sql = `
        INSERT INTO students
        (first_name, last_name, dob, gender, father_name, mother_name, phone, email, address, city, state, nationality, passing_certificate, admission_class)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const filePath = req.file ? `uploads/${req.file.filename}` : '';

    const values = [
        s.first_name,
        s.last_name || '',
        s.dob,
        s.gender,
        s.father_name || '',
        s.mother_name || '',
        s.phone,
        s.email,
        s.address || '',
        s.city || '',
        s.state || '',
        s.nationality || '',
        filePath,
        parseInt(s.admission_class)
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send('❌ Database Error');
        }
        res.send('✔ Student registered successfully');
    });
});

/* =====================
   Admin Login
===================== */
app.post('/admin_login', (req, res) => {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        req.session.adminLoggedIn = true;
        return res.redirect('/dashboard');
    }
    res.send('❌ Invalid Username or Password');
});

/* =====================
   Dashboard
===================== */
app.get('/dashboard', (req, res) => {
    if (!req.session.adminLoggedIn) return res.redirect('/admin_login.html');

    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

/* =====================
   Fetch Students
===================== */
app.get('/students', (req, res) => {
    if (!req.session.adminLoggedIn) return res.status(401).json({ message: 'Unauthorized' });

    db.query('SELECT * FROM students', (err, results) => {
        if (err) return res.status(500).send('❌ Database Error');
        res.json(results);
    });
});

/* =====================
   Logout
===================== */
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/admin_login.html');
    });
});

/* =====================
   Start Server
===================== */
app.listen(port, () => {
    console.log(`🚀 Server running: http://localhost:${port}`);
});

