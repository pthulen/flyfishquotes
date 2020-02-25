const express = require('express');
const apiRouter = express.Router();

const quotesRouter = require('./quotes');



apiRouter.use('/quotes', quotesRouter);


module.exports = apiRouter;