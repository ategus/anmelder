'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

/*
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "172.17.0.1",
  user: "root",
  password: "example"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

*/