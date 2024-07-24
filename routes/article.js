const express = require('express');
const router = express.Router();
const generateUniqueId = require('generate-unique-id');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise'); // Import the promise-based version
const multer = require('multer');
const cors = require('cors'); 
const path = require('path');
const storage = multer.diskStorage( // Set up the storage for multer
  {
    destination: function (req, file, cb) { // Set the destination folder
      cb(null, 'index/public/images') // The folder must exist before saving
    },
    filename: (req, file, cb) => { // Set the file name
      cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)) // Use the field name (i.e. picture) as the file name
    }
  }
);

const upload = multer({ storage: storage }); 

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Greygrius2002***",
  database: "wikipedia"
});

// Middleware function for JWT verification
async function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'tom124');
    req.user = decoded; // Save the decoded user information for later use
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
}

// Delete a specific article
router.delete('/:articleId',verifyToken, async (req, res) => {
  console.log("Inside DELETE function");

  const articleId = req.params.articleId;

  try {
    const [queryResult] = await connection.execute('DELETE FROM wikiarticle WHERE article_id = ?', [articleId]);

    if (queryResult.affectedRows > 0) {
      console.log("Record deleted successfully");
      res.json({
        message: 'Deleted record with ID ' + articleId
      });
    } else {
      console.log("Record not found");
      res.status(404).json({
        error: 'Record not found'
      });
    }
  } catch (err) {
    console.error('Error deleting record:', err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// Update a specific article
router.put('/:articleId',[verifyToken, upload.single('picture')], async (req, res) => {
  console.log("Inside PUT function");

  const formattedDate = new Date();
  const articleId = req.params.articleId;
  const updatedArticle = req.body;
  const {
    creator_name,
    title,
    text,
    pic_caption
  } = updatedArticle;

  try {
    let picture_link = null;

    if (req.file) {
      picture_link = req.file.filename;
    }

    const [queryResult] = await connection.execute(
      'UPDATE wikiarticle SET creator_name=?, title=?, text=?, picture_link=?, pic_caption=?, last_updated=? WHERE article_id=?',
      [creator_name, title, text, picture_link, pic_caption,  formattedDate, articleId,]
    );

    if (queryResult.affectedRows > 0) {
      console.log("Record updated successfully");
      res.json({
        message: 'Updated record with ID ' + articleId
      });
    } else {
      console.log("Record not found", queryResult);
      res.status(404).json({
        error: 'Record not found'
      });
    }
  } catch (err) {
    console.error('Error updating record:', err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// Upload an article
router.post('/', [verifyToken, upload.single('picture')], async (req, res) => {
  console.log("Inside POST function");
  console.log(req.file, 'req.file');

  try {
    // Ensure that req.user, req.body, and req.file are defined
    const wikipedia_article = req.body || {};
    const article_id = generateUniqueId({
      length: 6,
      useLetters: false
    });

    const {
      creator_name,
      title,
      text,
      pic_caption
    } = wikipedia_article;

    console.log(req.file.filename, 'req.file.filename');
    const sqlQuery = `
      INSERT INTO wikiarticle (creator_name, title, article_id, text, picture_link, pic_caption, userId, last_updated)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `;

    // Ensure that all parameters are defined
    const queryResult = await connection.execute(sqlQuery, [
      creator_name || '', // Provide a default value if undefined
      title || '',
      article_id,
      text || '',
      req.file.filename || null, // Use null if undefined
      pic_caption || '',
      (req.user && req.user.userId) || null, // Use null if undefined
    ]);

    console.log("1 record inserted, ID:", queryResult.insertId);

    res.json({
      message: 'Inserted record ' + queryResult.insertId
    });
  } catch (err) {
    console.error('Error inserting record:', err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});


// Get articles for a specific user
router.get('/user', async (req, res) => {
  const token = req.headers.authorization;
  const user = jwt.verify(token, 'tom124');

console.log({user}, 'user');
  try {
    const [queryResult] = user ? await connection.execute(
      'SELECT * FROM wikiarticle WHERE userId = ?',
      [user.userId]
    ) : await connection.execute(
      'SELECT * FROM wikiarticle'
    );

    if (queryResult.length === 0) {
      return res.json({
        message: 'User has no articles',
        articles: []
      });
    }

    const articles = queryResult;

    res.json({
      message: 'Retrieved user articles',
      articles: articles
    });
  } catch (err) {
    console.error('Error retrieving user articles:', err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});




// Get a specific article by ID
router.get('/:article_id', async (req, res) => {
  const article_id = req.params.article_id;

  try {
    const [queryResult] = await connection.execute('SELECT * FROM wikiarticle WHERE article_id = ?', [article_id]);

    if (queryResult.length === 0) {
      return res.status(404).json({
        message: 'Article not found'
      });
    }

    const article = queryResult[0];

    res.json({
      message: 'Retrieved article',
      article: {
        article_id: article.article_id,
        creator_name: article.creator_name,
        title: article.title,
        text: article.text,
        picture_link: article.picture_link,
        pic_caption: article.pic_caption,
      }
    });
  } catch (err) {
    console.error('Error retrieving article:', err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const [queryResult] = await connection.execute('SELECT * FROM wikiarticle');

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
  } catch (err) {
    console.error('Error retrieving articles:', err);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
});

module.exports = router;