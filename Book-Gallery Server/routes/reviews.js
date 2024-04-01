const express = require('express');
const router = express.Router();

module.exports = (db) => {

    // API endpoint to submit a review for a book
router.post('/', (req, res) => {
    const { bookId, userId, rating, comment } = req.body;

   // Validate request parameters
if (!bookId) {
    res.status(400).json({ error: 'Missing bookId parameter' });
    return;
}

if (!userId) {
    res.status(400).json({ error: 'Missing userId parameter' });
    return;
}

if (!rating) {
    res.status(400).json({ error: 'Missing rating parameter' });
    return;
}

if (!comment) {
    res.status(400).json({ error: 'Missing comment parameter' });
    return;
}


    // Insert the review into the database
    const sql = 'INSERT INTO Reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)';
    const values = [bookId, userId, rating, comment];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting review into database:', err);
            res.status(500).json({ error: 'Error submitting review' });
            return;
        }

        res.status(201).json({ message: 'Review submitted successfully' });
    });
});

    return router;
};
