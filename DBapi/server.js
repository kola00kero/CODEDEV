const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})

const users = require('sqlite3').verbose();

// open the database
let db = new users.Database('./db/user.db', users.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to database.');
});

let sql = `SELECT * FROM users`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row.id,row.first_name,row.last_name,row.email,row.gender,row.age);
  });
});

app.route('/api/user').get((req, res) => {

});

app.route('/user', (req, res) => {
  const users = require('sqlite3').verbose();

  // open the database
  let db = new users.Database('./db/user.db', users.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to database.');
  });

  let sql = `SELECT * FROM users`;

  db.each(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      res.send(row.first_name);
    });
  });
})

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Close the database connection.');
});
