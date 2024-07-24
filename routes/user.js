const express = require('express');
const { json } = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

var mysql = require('mysql2');

// Secret key for signing the token
const secretKey = 'tom124';

function generateJwtToken(username, password, userId) {
  // Create a payload with user information
  const payload = {
    username: username,
    password: password,
    userId: userId,
    // You can include additional claims here
  };

  // Sign the token with the secret key and set an expiration time
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}

function verifyJwtToken(token) {
  try {
    // Verify the token with the secret key
    const decoded = jwt.verify(token, secretKey);

    // If verification is successful, the token is valid
    return decoded;
  } catch (error) {
    // If verification fails, the token is invalid
    console.error('Token verification failed:', error.message);
    return null;
  }
}


var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Greygrius2002***",
  database: "wikipedia"
});

// Middleware to parse JSON
app.use(bodyParser.json());

// Register Function
router.post('/register', (req, res) => {
  console.log("inside of register POST function");

  let user = req.body;
  let username = user.username;
  let password = user.password;

  // bcrypt.hash(user.password, 10, function(err, hash) {
  //   if (err) {
  //     console.error("Error hashing password:", err);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  
  let firstName = user.firstName;
  let lastName = user.lastName;

  connection.connect(function (err) {
    if (err) {
      console.error("Error connecting to the database:", err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    console.log("Connected!");

    console.log(username, password, firstName, lastName);

    var sqlQuery = 'INSERT INTO user (username, password, first_name, last_name) VALUES (?, ?, ?, ?)';
    connection.query(sqlQuery, [username, password, firstName, lastName], function (err, queryResult) {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: err || 'Username or Password already exists' });
      }

      console.log("1 record inserted, ID:" + queryResult.insertId);
      res.json({
        message: 'Inserted record ' + queryResult.insertId
      });
    });
  });
});


// Login Function
router.post('/login', (req, res) => {
  console.log("inside of login POST function");

  // Get the login data from the request body
  const { username, password } = req.body;

  // Validate the login data
  if (!username || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Check if the user exists in the database
  connection.query(`SELECT * FROM user WHERE username = "${username}"`, function (err, result) {
    console.log({err});
    if (err) throw err;

    // If the user does not exist, return an error
    if (!result[0]) {
      return res.status(404).json({ error: 'User not found' });
    }
console.log({result, password});
    // Check if the password is correct
    if ((password !== result[0].password)) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
console.log({result});
    // Generate a JWT token for the user
    const token = generateJwtToken(result[0].username, result[0].password, result[0].userId);

    // Set the cookie
    res.cookie('token', token, { httpOnly: true });

   
    return res.status(200).json({token, ...result[0] });
  });
});

// Example usage in your existing code
router.get('/profile', (req, res) => {
  // Get the token from the request (You may need to modify this based on how you're sending the token in your requests)
  const token = req.headers.authorization

  // Decode the token
  const decodedInfo = verifyJwtToken(token);

  if (!decodedInfo) {
    // If the token is invalid, return an error
    return res.status(401).json({ error: 'Unauthorized' });
  }



  res.json({ message: 'Profile retrieved successfully', user: decodedInfo });
});


router.delete('/:username', async (req, res) => {
  console.log("Inside DELETE function");

  const username = req.params.username;

    // Get the token from the request (You may need to modify this based on how you're sending the token in your requests)
    const token = req.headers.authorization

    // Decode the token
    const decodedInfo = verifyJwtToken(token);
  
    if (!decodedInfo) {
      // If the token is invalid, return an error
      return res.status(401).json({ error: 'Unauthorized' });
    }
console.log(username, 'username');
  await connection.promise().execute('DELETE FROM wikiarticle WHERE userId = ?', [decodedInfo.userId]);
  try {
  // Use async/await to make the database query synchronous
  const [queryResult] = await connection.promise().execute('DELETE FROM user WHERE userId = ?', [decodedInfo.userId]);

    if (queryResult.affectedRows > 0) {
      console.log("Record deleted successfully");
      res.json({
        message: 'Deleted record with ID ' + username
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

// HTML route to display user information
router.get('/user/:username', (req, res) => {
  const { username } = req.params;

  connection.query(`SELECT * FROM user WHERE username = "${username}"`, function (err, result) {
    if (err) throw err;

    if (!result[0]) {
      return res.status(404).send('User not found');
    }

    const user = result[0];

    res.send(`
      <h1>User Information</h1>
      <p>Username: ${user.username}</p>
    `);
  });
});

module.exports = router;
