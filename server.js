const express = require('express');
const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// 1. Be Polite, Greet the User
// Responds to /greetings/<username>
app.get('/greetings/:name', (req, res) => {
    res.send(`Hello there, ${req.params.name}`);
});

// 2. Rolling the Dice
// Uses validator npm package to confirm the input is a number
app.get('/roll/:num', (req, res) => {
    let input = req.params.num;
    if (Number.isInteger(input)) {
        res.send(`You rolled a ${Math.floor(Math.random() * (Number(input) + 1))}.`);
    } else {
        res.send('You must specify a number.');
    }
});


// 3. I Want THAT One!
// matches routes for the data set given, verifies if it exists

app.get('/collectibles/:index', (req, res) => {
    let index = req.params.index;
    if (collectibles[index] === undefined) {
        res.send('This item is not yet in stock. Check back soon!');
    } else {
        res.send(`So you want the ${collectibles[index].name}? For \$${collectibles[index].price}, it can be yours!`);
    }
});

// 4. Filter Shoes by Query Parameters
// filters the shoes displayed based of query parameters
app.get('/shoes', (req, res) => {
    let output = [];
    shoes.forEach( (shoe) => {
        output.push(shoe);
    });

    if ('min-price' in req.query) {
        output = output.filter( (shoe) => shoe.price >= Number(req.query['min-price']));
    };

    if ('max-price' in req.query) {
        output = output.filter( (shoe) => shoe.price <= Number(req.query['max-price']));
    };

    if ('type' in req.query) {
        output = output.filter( (shoe) => shoe.type === req.query['type']);
    }

    res.send(output);
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
