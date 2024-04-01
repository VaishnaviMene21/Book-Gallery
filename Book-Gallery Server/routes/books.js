const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Get all books
    router.get('/', (req, res) => {
        const sql = `  SELECT b.*, AVG(r.rating) AS rating
        FROM Books b
        LEFT JOIN Reviews r ON b.book_id = r.book_id
        GROUP BY b.book_id;
        `;
        db.query(sql, (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Error fetching books from database' });
                return;
            }
            res.json(result);
        });
    });

    // Get book by ID
    router.get('/:id', (req, res) => {
        const bookId = req.params.id;

    // Query to get book details and its reviews
    const sql = `
    SELECT b.*, AVG(r.rating) AS rating
    FROM Books b
    LEFT JOIN Reviews r ON b.book_id = r.book_id
    WHERE b.book_id = ?;
    `;

    // Execute the query
    db.query(sql, [bookId], (err, results) => {
        if (err) {
            console.error('Error retrieving book details:', err);
            res.status(500).json({ error: 'Error retrieving book details' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }

        res.json(results);
    });
    });

    
// GET /api/books/search
// Search for books by title, author, or genre
// send request like  /api/books/search?title='' or author or genre

router.get('/search', (req, res) => {
    const { title, author, genre } = req.query;

    // Build SQL query based on search criteria
    let sql = 'SELECT * FROM Books WHERE 1';

    if (title) {
        sql += ` AND title LIKE '%${title}%'`;
    }

    if (author) {
        sql += ` AND author LIKE '%${author}%'`;
    }

    if (genre) {
        sql += ` AND genre LIKE '%${genre}%'`;
    }

    // Execute SQL query
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error searching for books' });
            return;
        }
        res.json(result);
    });
});


    return router;
};
