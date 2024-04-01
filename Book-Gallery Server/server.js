const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const booksRouter = require('./routes/books'); 
const reviweRouter = require('./routes/reviews')
const userRouter = require('./routes/user')

const app = express();
const port = 3001


// Create MySQL connection
const db = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    user: 'sql6695590',
    password: 'MvAtuxUCYt',
    database: 'sql6695590'
});

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use('/api/books', booksRouter(db));

app.use('/api/reviews', reviweRouter(db));

app.use('/api/user',userRouter(db))

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected...');
});

app.get('/api', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
