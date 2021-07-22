const express = require('express');
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PASSWORD, MONGO_USER, MONGO_PORT } = require('./config/config');

const app = express();

const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`

const connectWithRetry = (retryCount = 0) => {
  mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.log('Error connecting to MongoDB', err);
    if (retryCount < 5) {
      console.log('Retrying connection in 5 seconds...');
      setTimeout(() => {
        retryCount += 1;
        connectWithRetry(retryCount);
      }, 5000);
    } else {
      console.log('Failed to connect to MongoDB');
    }
  });
};

connectWithRetry()
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h2>Hi There<h2>');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});