const express = require('express');
const morgan = require('morgan');

// constants
const app = express();
const port = 8001;

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
console.log(`app is listening on port ${port}`);
});