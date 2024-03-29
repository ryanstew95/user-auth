const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
// constants
const app = express();
app.use(cookieParser())

const port = 8001;

// configuration
app.set('view engine', 'ejs');

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// data
const users = {
  abc: {
    id: "abc",
    username: "ryanstew",
    password: "123",
  },
  def: {
    id: "def",
    username: "bob",
    password: "456",
  },
};

// login endpoints
app.get('/login', (req, res) => {
res.render('login');
});

app.post('/login', (req, res) => {
const username = req.body.username;
const password = req.body.password;

if (!username || !password) {
  return res.status(400).send('you must provide a username and password');
}
let foundUser = null;
for (const userId in users) {
  const user = users[userId];
  if (user.username == username) {
    foundUser = user;
  }
}
if (!foundUser) {
  return res.status(400).send('no user with that username found');
}
if (foundUser.password !== password) {
  return res.status(400).send('the passwords do not match');
}

res.cookie('userId', foundUser.id);
res.redirect('/protected');
});

// protected endpoint
app.get('/protected', (req, res) => {
const userId = req.cookies.userId;

if (!userId) {
  res.status(401).send('you are unauthorized')
}

const user = users[userId];

const templateVars = {
user: user
};

res.render('protected', templateVars);
});

app.listen(port, () => {
console.log(`app is listening on port ${port}`);
});

