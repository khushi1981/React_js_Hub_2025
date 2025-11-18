const { MongoClient } = require('mongodb');

const MONGO_URL = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const DB_NAME = process.env.MONGO_DB || 'admin';

let client;
let db;

async function connect() {
  if (db) return db;

  client = new MongoClient(MONGO_URL);
  await client.connect();

  db = client.db(DB_NAME);
  console.log('Connected to MongoDB:', DB_NAME);

  return db;
}

function getDb() {
  if (!db) throw new Error("Database not connected! Call connect() first.");
  return db;
}

module.exports = { connect, getDb };
