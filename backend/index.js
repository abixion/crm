const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/UserRoute');
const cors = require('cors');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

mongoose.connect(DB)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(err.message));

app.use(express.json());
app.use(cors('*'));
app.use('/api/auth', userRouter);

app.listen(5000, () => console.log(`Successfully `));
