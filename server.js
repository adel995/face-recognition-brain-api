const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'edd',
        password: 'e',
        database: 'smart-brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send(db.users)});

app.post('/signin', signin.signinHandler(db, bcrypt));
app.post('/register', register.registerHandler(db, bcrypt));
app.get('/profile/:id', profile.profileHandler(db));
app.put('/image', image.imageHandler(db));
app.post('/imageurl', image.handleApiCall());

app.listen(procces.env.PORT || 3000, () => {console.log(`app is running on port ${process.env.PORT}`)});