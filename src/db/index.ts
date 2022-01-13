import mongoose from 'mongoose';
import { config } from 'dotenv';
import log from '../logger';

config();

const url = process.env.ATLAS_URL;

mongoose.connect(url as string, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const { connection } = mongoose;

connection.once('open', () => {
  log.info('MongoDB database connected successfully');
});
