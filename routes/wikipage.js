const express = require('express');
const app = express();
const {json} = require('express');
const router = express.Router();
var mysql = require('mysql2');
const multer = require('multer');

const storage = multer.memoryStorage(); // Store the file in memory as a Buffer
const upload = multer({ storage: storage });


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Greygrius2002***",
    database: "wikipedia"
  });


//   router.post('/upload', upload.single('picture'), (req, res) => {
//     const picture = req.file.buffer; // Get the file buffer from the request
  
//     // Insert the picture into the database
//     connection.query('INSERT INTO wikiarticle (picture_link) VALUES (?)', [picture], (err, result) => {
//       if (err) {
//         console.error('Error inserting picture into database:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
  
//       res.json({ message: 'Picture inserted into the database' });
//     });
//   });

  router.get('/', (req, res) => {
    connection.query(
        'SELECT * FROM wikiarticle',
        function (err, queryResult, fields) {
            if (err) throw err;
            if (queryResult.length === 0) {
                return res.json({
                    message: 'No articles found',
                    articles: []
                });
            }
  
            const articles = queryResult;
  
            res.json({
                message: 'Retrieved articles',
                articles: articles
            });
        }
    );
  });

//   router.put('/update/:id', upload.single('picture'), (req, res) => {
//     const { id } = req.params;
//     const picture = req.file.buffer;
  
//     connection.query(
//       'UPDATE wikiarticle SET picture_link = ? WHERE article_id = ?',
//       [picture, id],
//       (err, result) => {
//         if (err) {
//           console.error('Error updating picture in database:', err);
//           return res.status(500).json({ error: 'Internal Server Error' });
//         }
  
//         res.json({ message: 'Picture updated in the database' });
//       }
//     );
//   });

  module.exports = router;