import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import { stringify } from 'uuid';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.dbName = database;

    this.db = null;
    this.connected = false;

    this.client.connect()
      .then(() => {
        this.db = this.client.db(this.dbName);
        this.connected = true;
      })
      .catch(() => {
        this.connected = false;
      });
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    if (!this.isAlive()) throw new Error('MongoDB not connected');
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    if (!this.isAlive()) throw new Error('MongoDB not connected');
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
