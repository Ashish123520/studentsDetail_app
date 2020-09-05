
const connection = require('../config');

module.exports.add=function(req,res)
{
    var users={
        "uid":req.body.uid,
        "name":req.body.name,
        "registration":req.body.registration,
        "expiry":req.body.expiry,
        "url":req.body.url,
        "student":req.body.student,
        "mail":req.body.mail,
        "web":req.body.web,
        "contact":req.body.contact  
    }  
    console.log(users)
     connection.query('INSERT INTO uni_details SET ?',users, function (error, results, fields) {
      if (error) {
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          console.log(results)
         res.redirect('/viewDetails')
      }
    });

}
