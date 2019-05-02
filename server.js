const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const bcrypt = require('bcrypt');
var knex = require('knex')({
	client: 'pg',
 	connection: {
    host : '127.0.0.1',
    user : 'parkashpant',
    password : '',
    database : 'smart-brain'
  }
});

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => {
	knex.select('*').from('users')
		.then(user => res.json(user))
		.catch(err => console.log(err))	
	})
app.post('/signin', (req, res) => {signin.signinHandler(req, res, knex, bcrypt)})
app.post('/register', (req, res) => {register.registerHandler(req, res, knex, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.profileHandler(req, res, knex)})
app.put('/image', (req, res) => {image.imageHandler(req, res, knex)})
app.post('/imageUrl', (req, res) => {image.handleApiCall(req, res)})


app.listen(3000, () => console.log('Your app is running at port 3000'));


