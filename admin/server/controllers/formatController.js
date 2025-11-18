// formatController.js
const { getDb } = require('../database');

function sendJSON(res, status, obj) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  res.end(JSON.stringify(obj));
}

async function getFormats(req, res) {
  try {
    const db = getDb();
    const formats = await db.collection('format').find({}).toArray();
    sendJSON(res, 200, formats);
  } catch (err) {
    console.error(err);
    sendJSON(res, 500, { error: 'Failed to fetch formats' });
  }
}

module.exports = { getFormats };
