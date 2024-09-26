const express = require('express');

const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

//setup view engine
app.set('view engine', 'ejs');

mongoose.connect(keys.mongodb.dbURI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

app.use('/auth', authRoutes)


app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('App now listening to port 3000');
})