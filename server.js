import express from 'express';
import dotenv from 'dotenv';
import db from './config/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// utvonalak


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})