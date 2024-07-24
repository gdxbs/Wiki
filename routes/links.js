const express = require('express');
const app = express();
const {json} = require('express');
const router = express.Router();
const path = require('path');

router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaAbout.html'));
  });

router.get('/aboutuser', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaAboutUser.html'));
});

router.get('/menuuser', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaMenuUser.html'));
});

router.get('/creation', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaArticleCreation.html'));
});

router.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaArticleEdit.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaLogin.html'));
});

router.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaMenu.html'));
});

router.get('/page', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaPage.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaRegistry.html'));
});

router.get('/workshop', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaWorkshop.html'));
});

router.get('/account', (req, res) => {
    res.sendFile(path.join(__dirname, '../pages/WikipediaAccount.html'));
});

module.exports = router;