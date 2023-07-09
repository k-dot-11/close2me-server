const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('./database.db'); // You can change ':memory:' to a file path to use a persistent database

// Create the "offer" table
db.run(`
  CREATE TABLE IF NOT EXISTS offer (
    offer_id INTEGER PRIMARY KEY,
    merchant_id INTEGER,
    merchant_name TEXT,
    merchant_location TEXT,
    merchant_latitude REAL,
    merchant_longitude REAL,
    offer_title TEXT,
    offer_description TEXT,
    rewards_description TEXT,
    inclusion_tags TEXT,
    other_tags TEXT,
    enabled INTEGER
  )
`);

// Create the "merchant" table
db.run(`
  CREATE TABLE IF NOT EXISTS merchant (
    merchant_id INTEGER PRIMARY KEY,
    merchant_location TEXT,
    merchant_name TEXT,
    merchant_latitude REAL,
    merchant_longitude REAL,
    accessibility_features TEXT,
    merchant_description TEXT,
    tags TEXT
  )
`);

module.exports = db;
