const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

//create new table if it doesn't exist
db.serialize(() =>{
    db.run(`CREATE TABLE IF NOT EXISTS Quotes (id INTEGER PRIMARY KEY NOT NULL, 
        quote TEXT NOT NULL, 
        person TEXT NOT NULL)`);    
});