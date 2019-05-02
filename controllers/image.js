const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '82c3e940498045738b6984e9517c28b9'
});

const handleApiCall = ((req, res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(response => {res.json(response)})
    .catch(err => {console.log(err)})
})
const imageHandler = ((req, res, knex) => {
	const { id } = req.body;
	knex('users')
		.where('id', '=', id)
		.increment('entries', 1)
  		.returning('entries')
  	.then(entries => res.json(entries[0]))
  	.catch(err => res.status(400).json('Unable to get entries'))
})

module.exports = {
	imageHandler: imageHandler,
	handleApiCall: handleApiCall
}