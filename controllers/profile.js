const profileHandler = ((req, res, knex) => {
	const { id } = req.params;
	knex.select('*').from('users').where({id})
		.then(user => {
			if(user.length) {
				res.json(user[0])
			} else {
				res.json("Not found")
			}
	})
	
		.catch(err => res.status(400).json('User not found'))
	})

module.exports = {
	profileHandler: profileHandler
}