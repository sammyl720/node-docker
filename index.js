const express = require('express');
const session = require('express-session');
const cors = require('cors');
const redis = require('redis');

let RedisStore = require('connect-redis')(session);

const postRouter = require('./routes/postRoutes')
const userRouter = require('./routes/userRoutes')
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PASSWORD, MONGO_USER, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT
});

const app = express();
app.enable('trust proxy');
app.use(cors());
app.use(session({
  store: new RedisStore({
    client: redisClient,
  }),
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
    resave: false,
    saveUninitialized: false,
    secure: false,
    httpOnly: true
  }
}));
app.use(express.json());
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

app.get('/api/v1', (req, res) => {
  res.send('<h2>Hi There!<h2>');
  console.log('GET /api/v1');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});