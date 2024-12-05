const cors = require('cors');

const express = require('express');
const app = express();
const port = 8000;
const Vigenere = require('caesar-salad').Vigenere;
app.use(express.json());
app.use(cors());

app.post('/encode', (req, res) => {
    const {password, message} = req.body;
    if (!password || !message) {
        return ('Password and message are required');
    }
    const cipheredText = Vigenere.Cipher(password).crypt(message);
    return res.json({encoded: cipheredText});
});

app.post('/decode', (req, res) => {
    const {password, message} = req.body;
    if (!password || !message) {
        return ('Password and message are required');
    }
    const decipheredText = Vigenere.Decipher(password).crypt(message);
    return res.json({decoded: decipheredText});
});




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});