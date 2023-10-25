const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  try {
    await client.connect();
    console.log('Erfolgreich mit der MongoDB-Datenbank verbunden');
  } catch (err) {
    console.error('Fehler beim Verbinden mit der MongoDB:', err);
  }
}

module.exports = { connect, client };