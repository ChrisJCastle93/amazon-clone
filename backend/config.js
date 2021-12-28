import dotenv from 'dotenv';

dotenv.config();

export default {
  MONGODB_URL: process.env.MONGODB_URL, // gets the value from config file.
  JWT_SECRET: `${process.env.JWT_SECRET_KEY}`,
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
};