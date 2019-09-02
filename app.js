const express = require('express');
const bodyparser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyparser.json());

const mysqlConnection = mysql.createPool({
  host: 'us-cdbr-iron-east-02.cleardb.net',
  user: 'bd39e805445917',
  password: 'f439716e',
  database: 'heroku_99ecfa2d2c08fa4'
});

mysqlConnection.getConnection((err) => {
  if (!err)
    console.log('DB connection succeded.')
  else
    console.log('DB connection failed \n Error: ' + JSON.stringify(err, undefined, 2));
});

app.listen(port, () => console.log(`listening on port ${port}..`));


app.get('/', (req, res) => {
  res.send(`Blackthorn API running on port ${port}`);
});

//Request service for test loader.io file
app.get('/loaderio-f6ce126d6f59b2c5449979d6489a3a15.txt', (req, res) => {
  res.sendFile('loaderio-f6ce126d6f59b2c5449979d6489a3a15.txt', { root: path.join(__dirname) });
});

/**
 * Items http methods
 */

//Get all items
app.get('/api/items', (req, res) => {
  mysqlConnection.query('SELECT * FROM items', (err, rows, fields) => {
    if (!err)
      res.send(rows)
    else
      console.log(err)
  });
});

//Get an specific item by id
app.get('/api/items/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM items WHERE iditem = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send(rows)
    else
      console.log(err)
  });
});

//Delete an specific item by id
app.delete('/api/items/:id', (req, res) => {
  mysqlConnection.query('DELETE FROM items WHERE iditem = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send(`Item ${req.params.id} deleted succesfully.`)
    else
      console.log(err)
  });
});

//Create an item
app.post('/api/items', (req, res) => {
  mysqlConnection.query('INSERT INTO items SET ?', req.body, (err, rows, fields) => {
    if (!err)
      res.send(`Item created succesfully.`)
    else
      console.log(err)
  });
});

//Update an item
app.put('/api/items', (req, res) => {
  mysqlConnection.query('UPDATE items SET ? WHERE iditem = ?', [req.body, req.body.iditem], (err, rows, fields) => {
    if (!err)
      res.send(`Item ${req.body.iditem} updated succesfully.`)
    else
      console.log(err)
  });
});

/**
 * Carts http methods
 */

//Get all carts
app.get('/api/carts', (req, res) => {
  mysqlConnection.query('SELECT * FROM carts', (err, rows, fields) => {
    if (!err)
      res.send(rows)
    else
      console.log(err)
  });
});

//Get an specific cart by id
app.get('/api/carts/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM carts WHERE idcart = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send(rows)
    else
      console.log(err)
  });
});

//Delete an specific cart by id
app.delete('/api/carts/:id', (req, res) => {
  mysqlConnection.query('DELETE FROM carts WHERE idcart = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send(`Cart ${req.params.id} deleted succesfully.`)
    else
      console.log(err)
  });
});

//Create an cart
app.post('/api/carts', (req, res) => {
  mysqlConnection.query('INSERT INTO carts SET ?', req.body, (err, rows, fields) => {
    if (!err)
      res.send(`Cart created succesfully.`)
    else
      console.log(err)
  });
});

//Update an cart
app.put('/api/carts', (req, res) => {
  mysqlConnection.query('UPDATE carts SET ? WHERE idcart = ?', [req.body, req.body.idcart], (err, rows, fields) => {
    if (!err)
      res.send(`Cart ${req.body.idcart} updated succesfully.`)
    else
      console.log(err)
  });
});


/**
 * Orders http methods
 */

//Get all orders
app.get('/api/orders', (req, res) => {
  mysqlConnection.query('SELECT * FROM orders', (err, rows, fields) => {
    if (!err)
      res.send(rows)
    else
      console.log(err)
  });
});

//Get an specific order by id
app.get('/api/orders/:id', (req, res) => {
  mysqlConnection.query('SELECT * FROM orders WHERE idorder = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send(rows)
    else
      console.log(err)
  });
});

//Delete an specific order by id
app.delete('/api/orders/:id', (req, res) => {
  mysqlConnection.query('DELETE FROM orders WHERE idorder = ?', [req.params.id], (err, rows, fields) => {
    if (!err)
      res.send(`Order ${req.params.id} deleted succesfully.`)
    else
      console.log(err)
  });
});

//Create an order
app.post('/api/orders', (req, res) => {
  mysqlConnection.query('INSERT INTO orders SET ?', req.body, (err, rows, fields) => {
    if (!err)
      res.send(`Order created succesfully.`)
    else
      console.log(err)
  });
});

//Update an order
app.put('/api/orders', (req, res) => {
  mysqlConnection.query('UPDATE orders SET ? WHERE idorder = ?', [req.body, req.body.idorder], (err, rows, fields) => {
    if (!err)
      res.send(`Order ${req.body.idorder} updated succesfully.`)
    else
      console.log(err)
  });
});