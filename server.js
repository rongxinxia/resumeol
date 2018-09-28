const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users=require('./routers/API/users');
const profile=require('./routers/API/profile');
const post=require('./routers/API/post');
const passport = require('passport');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURL;

mongoose.connect(db)
        .then(()=>console.log("successful"))
        .catch(err=>console.log(err))

app.use(passport.initialize());

// passport Config
require('./config/passport')(passport);

app.use('/api/users',users);
app.use('/api/profile',profile)
app.use('/api/posts',post)

const port= process.env.PORT || 4000;

app.listen(port, ()=>console.log(`${port}`));

