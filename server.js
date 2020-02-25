const express = require('express');
const app = express();

//const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

//api Router
const apiRouter = require('./api');

app.use(express.static('public'));

const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const morgan = require('morgan');

// Add middleware for handling CORS requests from index.html
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api', apiRouter);

app.use(errorhandler());

app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})