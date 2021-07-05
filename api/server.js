'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const data = require('./data');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//returns all products from data.js, used in displaying product list
app.get('/api/products', (req, res) => {
  return res.json(data.products);
});

//returns products from data.js that are in cart in local storage. used in displaying cart list
app.post('/api/products', (req, res) => {
  let products = [], id = null;
  let cart = JSON.parse(req.body.cart);
  if (!cart) return res.json(products)
  for (var i = 0; i < data.products.length; i++) {
    id = data.products[i].id.toString();
    if (cart.hasOwnProperty(id)) {
      data.products[i].qty = cart[id]
      products.push(data.products[i]);
    }
  }
  return res.json(products);
});


const PORT = 5000;

app.listen(PORT);
console.log('api running on port ' + PORT + ': ');