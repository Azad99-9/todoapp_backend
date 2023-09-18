const { MongoClient } = require('mongodb');
const uri = require('./atlas_uri');

const client = new MongoClient(uri);

async function main() {
    try {
      await client.connect();
      console.log('Connection established successfully.');
    } catch (err) {
      console.error(err);
    }
  }
  
  main();

module.exports = client
