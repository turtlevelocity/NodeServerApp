const express = require('express');
const userRoute = require('./route/user');
const authRoute = require('./route/auth');

const mongoose = require("mongoose");

require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/user', userRoute);

app.use('/auth', authRoute);


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