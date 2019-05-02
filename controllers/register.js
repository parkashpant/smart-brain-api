const registerHandler = ((req, res, knex, bcrypt) => {
	const { name, email, password } = req.body;
	const hash = bcrypt.hashSync(password, 10);
	if (!name || !email || !password) {
		return res.status(400).json('Inappropriate name or email or password')
	}
	knex.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return knex('users')
				.returning('*')
				.insert({
					name: name,
					email: loginEmail[0],
					joined: new Date()
				})
				.then(user => res.json(user[0]))
				
		})
		.then(trx.commit)
    	.catch(trx.rollback);
	})
	.catch(err => res.status(400).json('Error in user registration'))
})

module.exports = {
	registerHandler: registerHandler
}