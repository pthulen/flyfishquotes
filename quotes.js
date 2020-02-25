const express = require('express');
const quotesRouter = express.Router();
const sqlite3 = require('sqlite3');

const { getRandomElement } = require('./utils');


//loads database and uses Test Database during tests rather than working database
const db = new sqlite3.Database('./database.sqlite');



  //GET all handler for all quotes or quotes by person
quotesRouter.get('/', (req, res, next) => {
    if(req.query.person !== undefined) {
        db.all('SELECT * FROM Quotes', (err, quotes) => {
            if (err) {
              next(err);
            } else {
                const quotesByPerson = quotes.filter(quote=> quote.person === req.query.person);
              res.status(200).json({quotes: quotesByPerson});
              
            }
          });
    } else {
    db.all('SELECT * FROM Quotes', (err, quotes) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({quotes: quotes});
        
      }
    });
    }
  });


quotesRouter.get('/random', (req, res, next) =>{
    db.all('SELECT * FROM Quotes', (err, quotes) => {
        if (err) {
          next(err);
        } else {
          const randomQuote = getRandomElement(quotes); 
          res.status(200).json({quote: randomQuote});
        }
      });
    });


//add new quote POST requests
quotesRouter.post('/', (req, res, next) =>{
    const newQuote = {
        quote: req.query.quote,
        person: req.query.person
    }
    if(!newQuote.quote || !newQuote.person) {
        return res.sendStatus(400);
    }

    const sql = `INSERT INTO Quotes (quote, person) VALUES ($quote, $person)`;
    const values = {
        $quote: newQuote.quote,
        $person: newQuote.person
    }

    db.run(sql, values, function(error) {
        if(error) {
            next(error);
        } else {
            db.get(`SELECT * FROM Quotes WHERE Quotes.id = $lastID`, {
                $lastID: this.lastID
            }, (error, quote) =>{
                res.status(201).json({quote: quote})
            })
        }
    })
});


module.exports = quotesRouter;