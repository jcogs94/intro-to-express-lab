const express = require('express');
const validator = require('validator');
const app = express();

// 1. Be Polite, Greet the User
// Responds to /greetings/<username>
app.get('/greetings/:name', (req, res) => {
    res.send(`Hello there, ${req.params.name}`);
});

// 2. Rolling the Dice
// Uses validator npm package to confirm the input is a number
app.get('/roll/:num', (req, res) => {
    let input = req.params.num;
    if (validator.isNumeric(input)) {
        res.send(`You rolled a ${Math.floor(Math.random() * (Number(input) + 1))}.`);
    } else {
        res.send('You must specify a number.');
    }
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
