var connection = require('../config');


	module.exports.authenticate=function(request,response){
		var sess = request.session; 
		var Email = request.body.email;
		var Password = request.body.password;
		const sql='SELECT * FROM accounts WHERE email = ? AND password = ?'
			connection.query(sql, [Email,Password], function(error, results) {
				console.log(results)
				if (results.length > 0) {
					sess.userId = results[0].id;
					 sess.user = results[0].username;
					//  console.log(sess.userId)
					response.redirect('/dashboard');
				} else {
					response.send('Incorrect email and/or Password!');
				}			
				response.end();
			});
	
	}