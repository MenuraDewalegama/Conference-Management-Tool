const {MongoClient} = require('mongodb');
const dotenv = require('dotenv').config();

if (dotenv.error) {
    throw dotenv.error;
}

const DATABASE = process.env.DATABASE;

const client = new MongoClient(DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});

client.connect(err => {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log("Connected to the MongoDB Successfully.")
});

module.exports = client;

