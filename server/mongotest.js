import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const mongoDbClient = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoDbClient.connect()
const db = mongoDbClient.db('bootcamp');
const collection = db.collection('users');

const user = {
    username: 'eulb',
    avatarUrl: 'https://cdn.discordapp.com/avatars/226720625329176576/addb4c6ba8508461d8644797c228fc5c.png?size=256',
    riotId: 'eulb',
    riotTag: 'baloo',
    puuid: 'cWPz4uDYILu73CGuAtVIjUZuzFjdYNmDFSYKAUZZHxDQso4wWsCfnmN5gzHs-BWpuXYPlrKJpfg2tA',
    tftTier: 'DIAMOND',
    tftRank: 3,
    tftLP: 69
}

db.collection('users').insertOne(user)
    .then(result => {
        console.log('User inserted:', result);
    })
    .catch(err => {
        console.error('Error inserting user:', err);
    })
    .finally(() => {
        mongoDbClient.close();
    });