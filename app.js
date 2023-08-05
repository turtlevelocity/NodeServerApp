const express = require('express');
const userRoute = require('./route/user');
const authRoute = require('./route/auth');
const friendRoute = require('./route/friend');

const mongoose = require("mongoose");
//session
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config();

const app = express();

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  saveUninitialized: false, // don't create session until something stored
  resave: false, //don't save session if unmodified
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    touchAfter: 24 * 3600,// time period in seconds
    dbName: 'session'
  })
}));

app.use('/user', userRoute);

app.use('/auth', authRoute);

app.use('/friend', friendRoute);


// GET, POST, PUT, DELETE
app.get('/home', (req, res)=> {
  res.send('this is home page');
});

// setup mongoose
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGO_URI;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(mongoDB);
};

// mongoose.connect(mongoDB).then(()=>{
//   console.log('connected')
// }).catch((err) => {
//   console.log(err);
// })

const db = mongoose.connection;

db.on('error', err => {
  console.log(err);
});

db.once('open', ()=> {
  console.log('connection open to db');
});

// console.log(process.env.PORT);
app.listen(process.env.PORT, ()=> {
  console.log(`Server is listening on port ${process.env.PORT}...`);
})