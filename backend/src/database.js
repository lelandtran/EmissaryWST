/**
 * @author Anthony Altieri on 5/27/17.
 */
import mongoose from 'mongoose';
import config from './config/config';

export function connectToDatabase() {
  // Use mongoose to connect to the Mongo instance via MongoURL
  mongoose.connect(config.mongoDBUrl);
  // Point a variable at that connection
  const db = mongoose.connection;
  // Inform us if there was an error connecting
  db.on('error', console.error.bind(console, 'connection error:'));
  // Inform us if connection was a success
  db.once('open', () => console.log("Connected to mongolab"));
  return db;
}

export default connectToDatabase;
