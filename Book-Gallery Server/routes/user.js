const express = require('express');
const router = express.Router();

module.exports = (db) => {
    
    router.post('/', (req, res) => {
        const { username, email } = req.body;
      
        // Check if email is available
        db.query('SELECT * FROM Users WHERE email = ?', email, (err, results) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
      
          if (results.length > 0) {
            // Email already exists, return user
            res.json({ user: results[0] });
          } else {
            // Email not found, create new account
            const newUser = { username, email };
            db.query('INSERT INTO Users SET ?', newUser, (err, results) => {
              if (err) {
                res.status(500).json({ error: err.message });
                return;
              }
              newUser.id = results.insertId;
              res.json({ user: newUser });
            });
          }
        });
      });
    
    return router;
};
